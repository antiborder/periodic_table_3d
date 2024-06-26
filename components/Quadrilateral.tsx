import React from "react"
import * as THREE from "three"
import { BufferGeometry, BufferAttribute } from "three"

type QuadrilateralProps = {
  points: number[][]
  color: string
  opacity?: number
}

const Quadrilateral = (props: QuadrilateralProps): React.ReactNode => {
  // ジオメトリの作成
  const geometry = new BufferGeometry()
  const positions = new Float32Array(18) // 6つの頂点 × 3次元座標（x, y, z）
  positions.set([
    ...props.points[0], // Point 1
    ...props.points[1], // Point 2
    ...props.points[2], // Point 3
    ...props.points[2], // Point 3
    ...props.points[3], // Point 4
    ...props.points[0], // Point 1
  ])
  geometry.setAttribute("position", new BufferAttribute(positions, 3))

  return <Scene {...props} geometry={geometry} />
}

const Scene = (props) => {
  return (
    <mesh geometry={props.geometry}>
      <meshBasicMaterial
        color={props.color}
        opacity={props.opacity}
        transparent={true}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}
export default Quadrilateral
