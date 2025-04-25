
import { Line as DreiLine } from '@react-three/drei'
import * as THREE from 'three'

interface CustomLineProps {
  points: THREE.Vector3[];
  color?: string;
}

export function CustomLine({ points, color = "#6366f1" }: CustomLineProps) {
  return (
    <DreiLine 
      points={points}
      color={color}
      lineWidth={1}
    />
  );
}
