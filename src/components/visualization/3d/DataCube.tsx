
import { useRef, useState } from 'react'
import * as THREE from 'three'

interface DataCubeProps {
  position?: [number, number, number];
  color?: string;
}

export function DataCube({ position = [0, 0, 0], color = '#4f46e5' }: DataCubeProps) {
  const [hovered, setHovered] = useState(false)
  const meshRef = useRef<THREE.Mesh>(null)
  
  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.2 : 1}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? '#22c55e' : color} />
    </mesh>
  )
}
