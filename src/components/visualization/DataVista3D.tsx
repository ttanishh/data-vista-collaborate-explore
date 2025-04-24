
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import { Suspense, useState, useEffect } from 'react'
import * as THREE from 'three'

function DataCube({ position = [0, 0, 0], color = '#4f46e5' }) {
  const [hovered, setHovered] = useState(false)
  const [rotationSpeed, setRotationSpeed] = useState(0.01)
  
  return (
    <mesh
      position={position as [number, number, number]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.2 : 1}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? '#22c55e' : color} />
    </mesh>
  )
}

function FloatingGraph() {
  const points = []
  const numPoints = 100
  
  for (let i = 0; i < numPoints; i++) {
    const x = (Math.random() - 0.5) * 10
    const y = (Math.random() - 0.5) * 10
    const z = (Math.random() - 0.5) * 10
    points.push(new THREE.Vector3(x, y, z))
  }
  
  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)
  
  return (
    <line geometry={lineGeometry}>
      <lineBasicMaterial color="#6366f1" linewidth={1} />
    </line>
  )
}

export function DataVista3D() {
  return (
    <div className="w-full h-full min-h-[400px] relative">
      <Canvas
        camera={{ position: [5, 5, 5] }}
        className="bg-gradient-to-br from-background/50 via-background to-background/90"
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Suspense fallback={null}>
          <DataCube position={[0, 0, 0]} />
          <DataCube position={[2, 0, 0]} color="#ec4899" />
          <DataCube position={[-2, 0, 0]} color="#f59e0b" />
          <FloatingGraph />
          <OrbitControls 
            enableZoom={true}
            enablePan={true}
            enableRotate={true}
            autoRotate={true}
            autoRotateSpeed={1}
          />
        </Suspense>
      </Canvas>
      <div className="absolute bottom-4 left-4 text-sm text-muted-foreground">
        Drag to rotate • Scroll to zoom • Double click to reset
      </div>
    </div>
  )
}
