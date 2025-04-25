
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Suspense } from 'react'
import { DataCube } from './3d/DataCube'
import { FloatingGraph } from './3d/FloatingGraph'
import { Grid } from './3d/Grid'

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
