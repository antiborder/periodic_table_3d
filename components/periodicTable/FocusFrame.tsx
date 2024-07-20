import React from "react"
import * as THREE from "three"
import { BufferGeometry, BufferAttribute, Mesh, MeshBasicMaterial } from "three"
import Quadrilateral from "./Quadrilateral"

type FocusFrameProps = {
  points: number[][]
  color: string
}
const FocusFrame = (props: FocusFrameProps): React.ReactNode => {
  const outerDelta = 0.1
  const lineWidth = 0.07
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

  return (
    <>
      <Quadrilateral
        points={[
          [props.points[0][0] - outerDelta, props.points[0][1], props.points[0][2] + outerDelta],
          [props.points[1][0] - outerDelta, props.points[1][1], props.points[1][2] - outerDelta],
          [
            props.points[1][0] - outerDelta + lineWidth,
            props.points[1][1],
            props.points[1][2] - outerDelta,
          ],
          [
            props.points[0][0] - outerDelta + lineWidth,
            props.points[0][1],
            props.points[0][2] + outerDelta,
          ],
        ]}
        color={"blue"}
      />

      <Quadrilateral
        points={[
          [props.points[2][0] + outerDelta, props.points[2][1], props.points[2][2] - outerDelta],
          [props.points[3][0] + outerDelta, props.points[3][1], props.points[3][2] + outerDelta],
          [
            props.points[3][0] + outerDelta - lineWidth,
            props.points[3][1],
            props.points[3][2] + outerDelta,
          ],
          [
            props.points[2][0] + outerDelta - lineWidth,
            props.points[2][1],
            props.points[2][2] - outerDelta,
          ],
        ]}
        color={"blue"}
      />
      <Quadrilateral
        points={[
          [
            props.points[3][0] + outerDelta,
            props.points[3][1],
            props.points[3][2] + outerDelta - lineWidth,
          ],
          [
            props.points[0][0] - outerDelta,
            props.points[0][1],
            props.points[0][2] + outerDelta - lineWidth,
          ],
          [props.points[0][0] - outerDelta, props.points[0][1], props.points[0][2] + outerDelta],
          [props.points[3][0] + outerDelta, props.points[3][1], props.points[3][2] + outerDelta],
        ]}
        color={"blue"}
      />
      <Quadrilateral
        points={[
          [
            props.points[1][0] - outerDelta,
            props.points[1][1],
            props.points[1][2] - outerDelta + lineWidth,
          ],
          [
            props.points[2][0] + outerDelta,
            props.points[2][1],
            props.points[2][2] - outerDelta + lineWidth,
          ],
          [props.points[2][0] + outerDelta, props.points[2][1], props.points[2][2] - outerDelta],
          [props.points[1][0] - outerDelta, props.points[1][1], props.points[1][2] - outerDelta],
        ]}
        color={"blue"}
      />
    </>
  )
}
export default FocusFrame