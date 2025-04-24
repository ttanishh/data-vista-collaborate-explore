
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useState, useRef } from 'react';
import * as THREE from 'three';

interface CubeProps {
  position: [number, number, number];
  color?: string;
  size?: number;
  opacity?: number;
}

function DataCube({ position, color = '#4f46e5', size = 1, opacity = 1 }: CubeProps) {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef<THREE.Mesh>(null);
  
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
      />
    </mesh>
  );
}

// Create a custom line component that doesn't use the problematic Three.js line implementation
function CustomLine({ start, end, color = "#6366f1" }: { start: [number, number, number], end: [number, number, number], color?: string }) {
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
      <cylinderGeometry args={[0.03, 0.03, length, 8]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

interface Props {
  operation: 'original' | 'rollup' | 'drilldown' | 'slice' | 'dice' | 'pivot';
}

export function OlapCube3D({ operation }: Props) {
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
            <DataCube position={[0, 1, 0]} color="#ec4899" size={1.5} />
            {/* Connection lines using custom line implementation */}
            <CustomLine start={[-2, -1, 0]} end={[0, 1, 0]} />
            <CustomLine start={[0, -1, 0]} end={[0, 1, 0]} />
            <CustomLine start={[2, -1, 0]} end={[0, 1, 0]} />
          </group>
        );
      
      case 'slice':
        return (
          <group>
            {/* Show a cube being sliced */}
            <DataCube position={[-1.5, 0, 0]} opacity={0.3} />
            <DataCube position={[0, 0, 0]} color="#ec4899" />
            <DataCube position={[1.5, 0, 0]} opacity={0.3} />
          </group>
        );
      
      case 'dice':
        return (
          <group>
            {/* Show multiple smaller cubes being selected */}
            <DataCube position={[-1, 1, 0]} size={0.8} color="#ec4899" />
            <DataCube position={[1, 1, 0]} opacity={0.3} size={0.8} />
            <DataCube position={[-1, -1, 0]} size={0.8} color="#ec4899" />
            <DataCube position={[1, -1, 0]} opacity={0.3} size={0.8} />
            <DataCube position={[0, 0, 1]} size={0.8} color="#ec4899" />
            <DataCube position={[0, 0, -1]} opacity={0.3} size={0.8} />
          </group>
        );
      
      case 'pivot':
        return (
          <group>
            {/* Show cube rotation */}
            <DataCube position={[-2, 0, 0]} />
            <DataCube position={[2, 0, 0]} color="#ec4899" />
            <CustomLine start={[-2, 0, 0]} end={[2, 0, 0]} />
          </group>
        );
      
      default:
        return (
          <group>
            <DataCube position={[0, 0, 0]} />
          </group>
        );
    }
  };

  return (
    <div className="w-full h-64 bg-muted/20 rounded-lg overflow-hidden">
      <Canvas
        camera={{ position: [4, 4, 4], fov: 50 }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        {getVisualization()}
        <OrbitControls 
          enableZoom={false}
          autoRotate={true}
          autoRotateSpeed={2}
        />
      </Canvas>
    </div>
  );
}
