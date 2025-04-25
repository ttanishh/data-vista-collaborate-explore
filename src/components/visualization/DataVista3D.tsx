
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Line as DreiLine } from '@react-three/drei'
import { Suspense, useState, useRef, useMemo } from 'react'
import * as THREE from 'three'

interface DataCubeProps {
  position?: [number, number, number];
  color?: string;
}

function DataCube({ position = [0, 0, 0], color = '#4f46e5' }: DataCubeProps) {
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

function FloatingGraph() {
  // Create points using useMemo to avoid recreation on every render
  const points = useMemo(() => {
    const pts = []
    const numPoints = 100
    
    for (let i = 0; i < numPoints; i++) {
      const x = (Math.random() - 0.5) * 10
      const y = (Math.random() - 0.5) * 10
      const z = (Math.random() - 0.5) * 10
      pts.push([x, y, z])
    }
    return pts
  }, [])
  
  return (
    <group>
      {points.map((point, i) => {
        if (i === points.length - 1) return null;
        
        const nextPoint = points[(i + 1) % points.length];
        
        return (
          <CustomLine 
            key={i} 
            points={[
              new THREE.Vector3(point[0], point[1], point[2]),
              new THREE.Vector3(nextPoint[0], nextPoint[1], nextPoint[2])
            ]}
            color="#6366f1"
          />
        );
      })}
    </group>
  )
}

// Custom Line component that works with react-three-fiber v8
interface CustomLineProps {
  points: THREE.Vector3[];
  color?: string;
}

function CustomLine({ points, color = "#6366f1" }: CustomLineProps) {
  return (
    <DreiLine 
      points={points}
      color={color}
      lineWidth={1}
    />
  );
}

// Simple grid for reference
function Grid() {
  return (
    <gridHelper 
      args={[20, 20, '#4338ca', '#6366f1']}
      position={[0, -2, 0]} 
    />
  )
}

export function DataVista3D() {
  return (
    <div className="w-full h-full min-h-[400px] relative">
      <Canvas
        camera={{ position: [5, 5, 5] }}
        className="bg-gradient-to-br from-background/50 via-background to-background/90"
      >
        <color attach="background" args={['#020817']} />
        <fog attach="fog" args={['#020817', 10, 20]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Suspense fallback={null}>
          <DataCube position={[0, 0, 0]} />
          <DataCube position={[2, 0, 0]} color="#ec4899" />
          <DataCube position={[-2, 0, 0]} color="#f59e0b" />
          <FloatingGraph />
          <Grid />
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
