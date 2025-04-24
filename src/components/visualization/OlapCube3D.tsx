
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useState, useRef, useEffect } from 'react';
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
            {/* Connection lines */}
            <group>
              <line>
                <bufferGeometry
                  attach="geometry"
                  {...new THREE.BufferGeometry().setFromPoints([
                    new THREE.Vector3(-2, -1, 0),
                    new THREE.Vector3(0, 1, 0),
                  ])}
                />
                <lineBasicMaterial attach="material" color="#6366f1" />
              </line>
              <line>
                <bufferGeometry
                  attach="geometry"
                  {...new THREE.BufferGeometry().setFromPoints([
                    new THREE.Vector3(0, -1, 0),
                    new THREE.Vector3(0, 1, 0),
                  ])}
                />
                <lineBasicMaterial attach="material" color="#6366f1" />
              </line>
              <line>
                <bufferGeometry
                  attach="geometry"
                  {...new THREE.BufferGeometry().setFromPoints([
                    new THREE.Vector3(2, -1, 0),
                    new THREE.Vector3(0, 1, 0),
                  ])}
                />
                <lineBasicMaterial attach="material" color="#6366f1" />
              </line>
            </group>
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
            <line>
              <bufferGeometry
                attach="geometry"
                {...new THREE.BufferGeometry().setFromPoints([
                  new THREE.Vector3(-2, 0, 0),
                  new THREE.Vector3(2, 0, 0),
                ])}
              />
              <lineBasicMaterial attach="material" color="#6366f1" />
            </line>
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
