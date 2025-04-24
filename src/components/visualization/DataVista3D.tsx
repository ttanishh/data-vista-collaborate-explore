
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Suspense, useState, useRef, useMemo } from 'react'
import * as THREE from 'three'

function DataCube({ position = [0, 0, 0], color = '#4f46e5' }) {
  const [hovered, setHovered] = useState(false)
  const meshRef = useRef()
  
  return (
    <mesh
      ref={meshRef}
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
  // Create points properly using useMemo to avoid recreating them on every render
  const points = useMemo(() => {
    const pts = []
    const numPoints = 100
    
    for (let i = 0; i < numPoints; i++) {
      const x = (Math.random() - 0.5) * 10
      const y = (Math.random() - 0.5) * 10
      const z = (Math.random() - 0.5) * 10
      pts.push(new THREE.Vector3(x, y, z))
    }
    return pts
  }, [])
  
  return (
    <group>
      {points.map((point, i) => {
        // Only connect points that are somewhat close to each other
        if (i === points.length - 1) return null
        
        return (
          <line key={i}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={2}
                array={new Float32Array([
                  points[i].x, points[i].y, points[i].z,
                  points[(i + 1) % points.length].x,
                  points[(i + 1) % points.length].y,
                  points[(i + 1) % points.length].z
                ])}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#6366f1" />
          </line>
        )
      })}
    </group>
  )
}

// Create a simple grid for reference
function Grid() {
  return (
    <gridHelper 
      args={[20, 20, '#4338ca', '#6366f1']}
      position={[0, -2, 0]} 
      rotation={[0, 0, 0]}
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
