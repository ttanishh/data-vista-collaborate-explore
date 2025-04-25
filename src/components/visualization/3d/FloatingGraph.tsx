
import { useMemo } from 'react'
import * as THREE from 'three'
import { CustomLine } from './CustomLine'

export function FloatingGraph() {
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
