
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useState, useRef, useEffect } from 'react';
import * as THREE from 'three';

interface CubeProps {
  position: [number, number, number];
  color?: string;
  size?: number;
  opacity?: number;
  animate?: boolean;
}

function DataCube({ position, color = '#4f46e5', size = 1, opacity = 1, animate = false }: CubeProps) {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef<THREE.Mesh>(null);
  
  useEffect(() => {
    if (animate && meshRef.current) {
      const y = position[1];
      // Start slightly above final position for animation
      meshRef.current.position.y = y + 2;
      
      // Animate to final position
      const animateIn = () => {
        if (!meshRef.current) return;
        
        if (meshRef.current.position.y > y) {
          meshRef.current.position.y -= 0.1;
          requestAnimationFrame(animateIn);
        } else {
          meshRef.current.position.y = y;
        }
      };
      
      animateIn();
    }
  }, [animate, position]);

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? size * 1.1 : size}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial 
        color={hovered ? '#22c55e' : color} 
        transparent 
        opacity={opacity}
        emissive={hovered ? '#22c55e' : color}
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}

// Create a custom line component that doesn't use the problematic Three.js line implementation
function CustomLine({ 
  start, 
  end, 
  color = "#6366f1",
  thickness = 0.03
}: { 
  start: [number, number, number], 
  end: [number, number, number], 
  color?: string,
  thickness?: number 
}) {
  const ref = useRef<THREE.Mesh>(null);
  
  // Calculate the midpoint and direction
  const midX = (start[0] + end[0]) / 2;
  const midY = (start[1] + end[1]) / 2;
  const midZ = (start[2] + end[2]) / 2;
  
  // Calculate the length
  const dx = end[0] - start[0];
  const dy = end[1] - start[1];
  const dz = end[2] - start[2];
  const length = Math.sqrt(dx * dx + dy * dy + dz * dz);
  
  // Calculate the rotation
  const dirVec = new THREE.Vector3(dx, dy, dz).normalize();
  const quaternion = new THREE.Quaternion();
  const startVec = new THREE.Vector3(0, 1, 0); // Default cylinder orientation is along y-axis
  quaternion.setFromUnitVectors(startVec, dirVec);
  const euler = new THREE.Euler().setFromQuaternion(quaternion);
  
  return (
    <mesh 
      ref={ref} 
      position={[midX, midY, midZ]} 
      rotation={[euler.x, euler.y, euler.z]}
    >
      <cylinderGeometry args={[thickness, thickness, length, 8]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.2} />
    </mesh>
  );
}

interface Props {
  operation: 'original' | 'rollup' | 'drilldown' | 'slice' | 'dice' | 'pivot';
}

export function OlapCube3D({ operation }: Props) {
  const [showAnimation, setShowAnimation] = useState(false);
  
  // Reset animation when operation changes
  useEffect(() => {
    setShowAnimation(false);
    const timer = setTimeout(() => setShowAnimation(true), 100);
    return () => clearTimeout(timer);
  }, [operation]);

  const getVisualization = () => {
    switch (operation) {
      case 'rollup':
        return (
          <group>
            {/* Base layer cubes */}
            <DataCube position={[-2, -1, 0]} />
            <DataCube position={[0, -1, 0]} />
            <DataCube position={[2, -1, 0]} />
            {/* Aggregated cube */}
            <DataCube position={[0, 1, 0]} color="#ec4899" size={1.5} animate={showAnimation} />
            {/* Connection lines using custom line implementation */}
            <CustomLine start={[-2, -1, 0]} end={[0, 1, 0]} />
            <CustomLine start={[0, -1, 0]} end={[0, 1, 0]} />
            <CustomLine start={[2, -1, 0]} end={[0, 1, 0]} />
          </group>
        );
      
      case 'drilldown':
        return (
          <group>
            {/* Show a parent cube splitting into multiple detailed cubes */}
            <DataCube position={[0, 1.5, 0]} color="#a855f7" opacity={0.4} size={1.5} />
            <DataCube position={[-1.5, -0.5, -1]} color="#06b6d4" animate={showAnimation} />
            <DataCube position={[-1.5, -0.5, 1]} color="#06b6d4" animate={showAnimation} />
            <DataCube position={[1.5, -0.5, -1]} color="#06b6d4" animate={showAnimation} />
            <DataCube position={[1.5, -0.5, 1]} color="#06b6d4" animate={showAnimation} />
            <CustomLine start={[0, 1.5, 0]} end={[-1.5, -0.5, -1]} color="#a855f7" />
            <CustomLine start={[0, 1.5, 0]} end={[-1.5, -0.5, 1]} color="#a855f7" />
            <CustomLine start={[0, 1.5, 0]} end={[1.5, -0.5, -1]} color="#a855f7" />
            <CustomLine start={[0, 1.5, 0]} end={[1.5, -0.5, 1]} color="#a855f7" />
          </group>
        );
      
      case 'slice':
        return (
          <group>
            {/* Show a cube being sliced */}
            <DataCube position={[-2, 0, 0]} opacity={0.3} />
            <DataCube position={[0, 0, 0]} color="#ec4899" animate={showAnimation} />
            <DataCube position={[2, 0, 0]} opacity={0.3} />
            {/* Slice plane */}
            <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <planeGeometry args={[3, 3]} />
              <meshBasicMaterial color="#ec4899" transparent opacity={0.15} side={THREE.DoubleSide} />
            </mesh>
          </group>
        );
      
      case 'dice':
        return (
          <group>
            {/* Show multiple smaller cubes being selected */}
            <DataCube position={[-1, 1, 0]} size={0.8} color="#ec4899" animate={showAnimation} />
            <DataCube position={[1, 1, 0]} opacity={0.3} size={0.8} />
            <DataCube position={[-1, -1, 0]} size={0.8} color="#ec4899" animate={showAnimation} />
            <DataCube position={[1, -1, 0]} opacity={0.3} size={0.8} />
            <DataCube position={[0, 0, 1]} size={0.8} color="#ec4899" animate={showAnimation} />
            <DataCube position={[0, 0, -1]} opacity={0.3} size={0.8} />
            
            {/* Highlighting box around selected cubes */}
            <mesh position={[0, 0, 0]} scale={[2.8, 2.8, 2.8]}>
              <boxGeometry args={[1, 1, 1]} />
              <meshBasicMaterial color="#ec4899" wireframe={true} />
            </mesh>
          </group>
        );
      
      case 'pivot':
        return (
          <group>
            {/* Show cube rotation */}
            <DataCube position={[-2, 0, 0]} />
            <DataCube position={[2, 0, 0]} color="#ec4899" animate={showAnimation} />
            <CustomLine start={[-2, 0, 0]} end={[2, 0, 0]} thickness={0.05} />
            
            {/* Rotation axis */}
            <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.05, 0.05, 6, 16]} />
              <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={0.2} />
            </mesh>
            
            {/* Rotation arrows */}
            <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
              <torusGeometry args={[2.5, 0.08, 8, 32, Math.PI / 2]} />
              <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={0.2} />
            </mesh>
          </group>
        );
      
      case 'original':
      default:
        return (
          <group>
            {/* Basic data cube with dimensions */}
            <DataCube position={[0, 0, 0]} size={1.5} />
            
            {/* Dimension labels as lines */}
            <CustomLine start={[0, 0, 0]} end={[2, 0, 0]} color="#22c55e" />
            <CustomLine start={[0, 0, 0]} end={[0, 2, 0]} color="#ec4899" />
            <CustomLine start={[0, 0, 0]} end={[0, 0, 2]} color="#06b6d4" />
          </group>
        );
    }
  };

  return (
    <div className="w-full h-64 bg-muted/20 rounded-lg overflow-hidden border">
      <Canvas
        camera={{ position: [5, 5, 5], fov: 50 }}
        dpr={[1, 2]} // Better rendering on high-DPI displays
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <spotLight position={[-10, -10, -10]} angle={0.15} penumbra={1} intensity={0.5} />
        {getVisualization()}
        <OrbitControls 
          enableZoom={true}
          autoRotate={true}
          autoRotateSpeed={3}
          minDistance={3}
          maxDistance={15}
        />
        <gridHelper args={[10, 10, '#6b7280', '#6b7280']} position={[0, -2, 0]} />
      </Canvas>
    </div>
  );
}
