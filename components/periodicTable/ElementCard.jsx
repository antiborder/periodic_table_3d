import React, { useState } from "react"
import { config, useSpring, animated } from "@react-spring/three"
import { Text } from "@react-three/drei"
import elements from "../../constants/elements"
import Quadrilateral from "./Quadrilateral"
import FocusFrame from "./FocusFrame"
import { getTilt } from "../../utils/coordinateFuncs"
import CardRotationAngle from "../../domain/CardRotationAngle"
import CardOpacity from "../../domain/CardOpacity"
import CardColor from "../../domain/CardColor"
import CardPosition from "../../domain/CardPosition"

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const ElementCard = ({ size = 0.4, radius = 0, ...props }) => {
  const element = elements[props.atomicNumber.toString()]
  const cardPosition = new CardPosition(props.atomicNumber)
  const cardRotationAngle = new CardRotationAngle(props.atomicNumber)

  const [hovered, setHovered] = useState(false)
  const cardWidth = 0.8
  const cardHeight = 0.8

  const { transitionParameter } = useSpring({
    transitionParameter: props.shapeCount,
    config: { ...config.wobbly, duration: 2500 },
  })

  const opacity = new CardOpacity(props.characteristic, props.atomicNumber).getOpacity()
  const color = new CardColor(props.characteristic, props.atomicNumber).getColor()

  const handleElementClick = () => {
    props.setAtomicNumber(props.atomicNumber)
    props.setIsModalVisible(true)
  }

  const handlePointerOver = () => {
    setHovered(true)
  }

  const handlePointerOut = () => {
    setHovered(false)
  }

  const { scale } = useSpring({
    scale: hovered ? 1.8 : 1,
    config: config.wobbly,
  })

  return (
    <>
      <animated.mesh //{...props}
        position={transitionParameter.to((shapeCount) => cardPosition.coordinate(shapeCount))}
        onPointerOut={() => handlePointerOut()}
        scale={scale}
        onClick={handleElementClick}
        rotation={transitionParameter.to((shapeCount) => cardRotationAngle.angle(shapeCount))}
      >
        <group>
          <animated.mesh //{...props}
            rotation={transitionParameter.to((shapeCount) => getTilt(shapeCount))}
          >
            <Quadrilateral
              {...props}
              points={[
                [0, 0, 0],
                [0, 0, -cardHeight],
                [cardWidth, 0, -cardHeight],
                [cardWidth, 0, 0],
              ]}
              color={color}
              opacity={opacity}
            />
            {props.selectedAtomicNumber === element.atomicNumber && (
              <FocusFrame
                {...props}
                points={[
                  [0, 0, 0],
                  [0, 0, -cardHeight],
                  [cardWidth, 0, -cardHeight],
                  [cardWidth, 0, 0],
                ]}
              />
            )}
            <group rotation={[Math.PI / 2, 0, 0]}>
              <Text
                position={[0.1, -0.15, 0.01]}
                fontSize={0.2}
                color="#444"
                anchorX="center"
                anchorY="middle"
              >
                {props.atomicNumber}
              </Text>

              <Text
                position={[0.4, -0.43, 0.01]}
                fontSize={0.5}
                color={props.characteristic <= 2 ? "#000" : "#fff"}
                anchorX="center"
                anchorY="middle"
              >
                {element.symbol}
              </Text>
              <Text
                position={[0.3, -0.7, 0.01]}
                fontSize={0.15}
                color="#000"
                anchorX="center"
                anchorY="middle"
              >
                {element.name}
              </Text>
            </group>
          </animated.mesh>
        </group>
      </animated.mesh>
    </>
  )
}

export default ElementCard
