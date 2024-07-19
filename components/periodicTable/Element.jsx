import React, { useState } from "react"
import { config, useSpring, animated } from "@react-spring/three"
import { Text } from "@react-three/drei"
import elements from "../../constants/elements"
import convert from "color-convert"
import Quadrilateral from "./Quadrilateral"
import FocusFrame from "./FocusFrame"
import { getCoordinate, getRotationAngle, getTilt } from "../../funcs/coordinateFuncs"
import Opacity from '../../domain/Opacity';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Element = ({ size = 0.4, radius = 0, color = "#000000", ...props }) => {
  const element = elements[props.atomicNumber.toString()]

  const [hovered, setHovered] = useState(false)
  const cardWidth = 0.8
  const cardHeight = 0.8

  const { transitionParameter } = useSpring({
    transitionParameter: props.shapeCount,
    config: { ...config.wobbly, duration: 2500 },
  })

  const getColor = () => {
    let max = 0
    let min
    let weight
    let h
    let s
    let v

    switch (props.characteristic) {
      case 0:
        color =
          element.orbit.slice(-1) === "s"
            ? "#FF777A"
            : element.orbit.slice(-1) === "p"
              ? "#FFBC20"
              : element.orbit.slice(-1) === "d"
                ? "#67BCEE"
                : "#6ADE68"
        break

      case 3:
        max = 2372
        min = 370
        weight = -(element["1stIonizationEnergy"] - min) / (max - min) + 1
        h = Math.pow(weight, 2) * 120 + 240
        s = Math.pow(weight, 4) * 100
        v = Math.pow(weight, 2) * 100
        color = "#" + convert.hsv.hex(h, s, v)
        break
      case 4:
        max = 349
        min = -116
        weight = (element["electronAffinity"] - min) / (max - min)
        h = -Math.pow(weight, 1) * 120 + 330
        s = Math.pow(weight, 0.4) * 100
        v = Math.pow(weight, 0.6) * 100
        color = "#" + convert.hsv.hex(h, s, v)
        break
      case 1:
        max = 5930
        min = -273
        weight = -(element["boilingPoint"] - min) / (max - min) + 1
        h = Math.pow(weight, 1.5) * 180 + 0
        s = 100
        v = 100
        color = "#" + convert.hsv.hex(h, s, v)
        break
      case 2:
        max = 5930
        min = -273
        weight = -(element["meltingPoint"] - min) / (max - min) + 1
        h = Math.pow(weight, 1.5) * 180 + 0
        s = 100
        v = 100
        color = "#" + convert.hsv.hex(h, s, v)
        break
      default:
    }
    return color
  }

  const opacity = new Opacity(props.characteristic,props.atomicNumber).getOpacity();

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
        position={transitionParameter.to((shapeCount) => getCoordinate(shapeCount, props.atomicNumber))}
        onPointerOver={() => handlePointerOver()}
        onPointerOut={() => handlePointerOut()}
        scale={scale}
        onClick={handleElementClick}
        rotation={transitionParameter.to((shapeCount) => getRotationAngle(shapeCount, props.atomicNumber))}
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
              color={getColor()}
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
                color={getColor()}
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
                color={
                  props.characteristic <= 2 ? "#000" : "#fff"
                }
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

export default Element
