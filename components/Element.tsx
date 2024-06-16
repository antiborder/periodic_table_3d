import React, { useState } from "react"
import { config, useSpring, animated } from "@react-spring/three"
import styled from "styled-components"
import { Text } from "@react-three/drei"
import elements from "../constants/elements"
import convert from "color-convert"
import { Html } from "@react-three/drei"
import Quadrilateral from "./Quadrilateral"
// import { Euler } from '@react-three/fiber';
import FocusFrame from "./FocusFrame"

type ElementProps = {
  key: number
  size?: number
  radius?: number
  color?: string
  opacity?: number
  atomicNumber: number
  characteristicCount: number
  numberOfCharacteristics: number
  numberOfShapes: number
  shapesCount: number
  selectedAtomicNumber: number
  count: number
}

type Num3 = [number, number, number]

const Element = ({
  size = 0.4,
  radius = 0,
  color = "#000000",
  opacity = 1,
  ...props
}: ElementProps): React.ReactNode => {
  const SPIRAL_RADIUS_P = 1.8
  const SPIRAL_RADIUS_D = 4
  const SPIRAL_RADIUS_F = 7

  const ELEMENTOUCH_RADIUS_P = 2.0
  const ELEMENTOUCH_RADIUS_D = 2.4
  const ELEMENTOUCH_RADIUS_F = 3.6
  const element = elements[props.atomicNumber.toString()]

  const [hovered, setHovered] = useState(false)
  const [, setBubbleHovered] = useState(false)
  const cardWidth = 0.8
  const cardHeight = 0.8

  const { transitionParameter } = useSpring({
    transitionParameter: props.count,
    config: { ...config.wobbly, duration: 2500 },
  })

  const getColor = () => {
    let max = 0
    let min
    let weight
    let h
    let s
    let v

    switch (
      props.characteristicCount % props.numberOfCharacteristics
    ) {
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
        s = 100 //Math.pow(weight, 1) * 100
        v = 100 //Math.pow(weight, 0.7) * 100
        color = "#" + convert.hsv.hex(h, s, v)
        break
      case 2:
        max = 5930
        min = -273
        weight = -(element["meltingPoint"] - min) / (max - min) + 1
        h = Math.pow(weight, 1.5) * 180 + 0
        s = 100 //Math.pow(weight, 1) * 100
        v = 100 //Math.pow(weight, 0.7) * 100
        color = "#" + convert.hsv.hex(h, s, v)
        break
      default:
    }
    return color
  }
  const getOpacity = () => {
    const DEFAULT_OPACITY = 0.7
    const tmp_number: number = 0
    switch (
      tmp_number //(props.characteristicCount % props.numberOfCharacteristics) {
    ) {
      case 0:
        opacity = DEFAULT_OPACITY
        break
      case 3:
        opacity = element["1stIonizationEnergy"] === null ? 0 : DEFAULT_OPACITY
        break
      case 4:
        opacity = element["electronAffinity"] === null ? 0 : DEFAULT_OPACITY
        break
      case 1:
        opacity = element["boilingPoint"] === null ? 0 : DEFAULT_OPACITY
        break
      case 2:
        opacity = element["meltingPoint"] === null ? 0 : DEFAULT_OPACITY
        break

      default:
    }
    return opacity
  }

  const getOrbitNumber = (orbit) => {
    let orbitNumber = 0
    switch (orbit) {
      case "s":
        orbitNumber = 1
        break
      case "p":
        orbitNumber = 2
        break
      case "d":
        orbitNumber = 3
        break
      case "f":
        orbitNumber = 4
        break
      default:
    }
    return orbitNumber
  }

  const cylindricalToCartesian = ([radius, theta, z]: Num3): Num3 => {
    return [radius * Math.cos(theta), radius * Math.sin(theta), z]
  }

  const cartesianToCylindrical = ([x, y, z]: Num3): Num3 => {
    return [Math.sqrt(x * x + y * y), Math.atan2(y, x), z]
  }

  const getTableBasePosition = (atomicNumber: Number): Num3 => {
    return [element.tableColumn, 0, -elements[atomicNumber.toString()].tableRow]
  }

  const translateTablePosition = (position: Num3): Num3 => {
    return [position[0] - 13, position[1] - 6, position[2]]
  }

  const getTablePosition = (atomicNumber: number): Num3 => {
    return translateTablePosition(getTableBasePosition(atomicNumber))
  }

  const getOrbitalPositionX = () => {
    let x = 0
    let shellNumber = parseInt(element.orbit.slice(0, 1))
    let orbitNumber = getOrbitNumber(element.orbit.slice(-1))
    switch (orbitNumber) {
      case 1:
        if (element.atomicNumber === 2 || element.atomicNumber === 1) {
          x = element.spiralColumn - 4
        } else {
          x = element.spiralColumn - 6
        }
        break
      case 2:
        if (shellNumber === 2 || shellNumber === 3) {
          x = element.spiralColumn % 8
        } else {
          x = element.spiralColumn % 10
        }
        break
      case 3:
        if (
          props.atomicNumber === 21 ||
          props.atomicNumber === 39 ||
          props.atomicNumber === 71 ||
          props.atomicNumber === 103
        ) {
          x = 0
        } else {
          x = element.spiralColumn
        }
        break
      default:
        if (props.atomicNumber === 57 || props.atomicNumber === 89) {
          x = 0
        } else {
          x = element.spiralColumn
        }
    }
    return x
  }

  const orbitalPosition: Num3 = [
    getOrbitalPositionX(),
    +2 * getOrbitNumber(element.orbit.slice(-1)) - 5,
    -2 * parseInt(element.orbit.slice(0)),
  ]

  const { scale } = useSpring({
    scale: hovered ? 1.8 : 1,
    config: config.wobbly,
  })

  const handlePointerOver = () => {
    setHovered(true)
  }

  const handlePointerOut = () => {
    setHovered(false)
  }

  const handleBubblePointerOver = () => {
    setBubbleHovered(true)
  }

  const handleBubblePointerOut = () => {
    setBubbleHovered(false)
  }

  const getElementouchPeriod = () => {
    let period = 0
    switch (element["spiralRow"]) {
      case 4:
      case 6:
      case 9:
      case 12:
        period = 10
        break
      case 8:
      case 11:
        period = 14
        break
      default:
        period = 8
    }
    return period
  }

  const getSpiralPeriod = () => {
    let period = 0
    switch (element["tableRow"]) {
      case 2:
      case 3:
        period = 8
        break
      case 4:
      case 5:
        period = 18
        break
      case 6:
      case 7:
      case 9:
      case 10:
        period = 32
        break
      default:
        period = 8
    }
    return period
  }

  const radius0 = cartesianToCylindrical(getTablePosition(props.atomicNumber))[0]
  const theta0 = cartesianToCylindrical(getTablePosition(props.atomicNumber))[1]
  const z0 = cartesianToCylindrical(getTablePosition(props.atomicNumber))[2]

  const getRadius1 = () => {
    let radius = 0
    switch (element["tableRow"]) {
      case 4:
      case 5:
        radius = SPIRAL_RADIUS_D
        break
      case 6:
      case 7:
        radius = SPIRAL_RADIUS_F
        break
      case 9:
      case 10:
        radius = SPIRAL_RADIUS_F
        break
      default:
        radius = SPIRAL_RADIUS_P
    }
    return radius
  }
  const getTheta1down = () => {
    let baseTheta = 0
    switch (element["tableRow"]) {
      case 1:
      case 2:
      case 3:
        baseTheta =
          element.tableColumn <= 2
            ? ((element.tableColumn - 3.5) / getSpiralPeriod()) * 2 * Math.PI
            : ((element.tableColumn - 13.5) / getSpiralPeriod()) * 2 * Math.PI
        break
      case 4:
      case 5:
        baseTheta = ((element.tableColumn - 6) / 18) * 2 * Math.PI
        break
      case 6:
      case 7:
        baseTheta =
          element.tableColumn <= 2
            ? ((element.tableColumn - 9.5) / getSpiralPeriod()) * 2 * Math.PI
            : ((element.tableColumn + 4.5) / getSpiralPeriod()) * 2 * Math.PI
        break
      case 9:
      case 10:
        baseTheta = ((element.tableColumn - 9.5) / getSpiralPeriod()) * 2 * Math.PI

        break
      default:
        baseTheta = element.tableColumn - 1
    }
    // let baseTheta = element.tableColumn - 1 % getSpiralPeriod()
    let adjustedTheta = baseTheta //- Math.PI * 4.1 / 8
    return adjustedTheta
  }
  const getWinding = () => {
    let winding = 0
    winding =
      element.orbit.slice(-1) === "s"
        ? 0
        : element.orbit.slice(-1) === "p"
          ? element["winding"]
          : element.orbit.slice(-1) === "d"
            ? element.atomicNumber === 71 || element.atomicNumber === 103
              ? element["winding"]
              : element["winding"] + 1
            : (element.atomicNumber >= 67 && element.atomicNumber <= 70) ||
                (element.atomicNumber >= 99 && element.atomicNumber <= 102)
              ? element["winding"] - 1
              : element["winding"]
    return winding
  }
  const getTheta1up = () => {
    return getTheta1down()
  }
  const z1 =
    element.tableRow <= 5
      ? -element.tableRow - element.tableColumn / 18
      : element.tableRow >= 8
        ? -element.tableRow + 3 - element.tableColumn / 32
        : element.tableColumn <= 2
          ? -element.tableRow - element.tableColumn / 32
          : -element.tableRow - (element.tableColumn + 14) / 32
  const radius2 =
    element["tableRow"] <= 7
      ? element["tableRow"] + 2 + element["tableColumn"] / 18
      : element["tableRow"] - 1 + element["tableColumn"] / 32
  const theta2 =
    element["tableRow"] <= 7
      ? element["tableColumn"] <= 2
        ? (element["tableColumn"] / 32) * 2 * Math.PI - (Math.PI * 3) / 4
        : ((element["tableColumn"] + 14) / 32) * 2 * Math.PI - (Math.PI * 3) / 4
      : (element["tableColumn"] / 32) * 2 * Math.PI - (Math.PI * 3) / 4
  const z2 = -12

  const getRadius3 = () => {
    let radius = 0
    switch (element["spiralRow"]) {
      case 4:
      case 6:
      case 9:
      case 12:
        radius = ELEMENTOUCH_RADIUS_D
        break
      case 8:
      case 11:
        radius = ELEMENTOUCH_RADIUS_F
        break
      default:
        radius = ELEMENTOUCH_RADIUS_P
    }
    return radius
  }
  const getTheta3down = () => {
    let baseTheta = element.spiralColumn - (1 % getElementouchPeriod())
    let adjustedTheta =
      (baseTheta / getElementouchPeriod()) * 2 * Math.PI -
      (Math.PI * 4.1) / 8 +
      Math.PI -
      2 * Math.PI * element["winding"]
    return adjustedTheta
  }
  const getTheta3up = () => {
    let winding = 0
    switch (element["orbit"].slice(-1)) {
      case "s":
        winding = -1
        break
      case "p":
        winding = getOrbitalPositionX() === 0 ? -2 : -1
        break
      case "d":
        winding = getOrbitalPositionX() === 0 ? -2 : -1
        break
      case "f":
        winding = getOrbitalPositionX() === 0 ? -2 : -1
        break
      default:
    }

    let baseTheta = element.spiralColumn - (1 % getElementouchPeriod())
    let adjustedTheta =
      (baseTheta / getElementouchPeriod()) * 2 * Math.PI -
      (Math.PI * 4.1) / 8 +
      Math.PI +
      2 * Math.PI * winding
    return adjustedTheta
  }
  const z3 = -element.spiralRow - element.spiralColumn / getElementouchPeriod()

  const radius4 = cartesianToCylindrical(orbitalPosition)[0]
  const theta4 = cartesianToCylindrical(orbitalPosition)[1]
  const z4 = cartesianToCylindrical(orbitalPosition)[2]

  const revalueTheta = (theta) => {
    return Math.PI < theta ? theta - 2 * Math.PI : theta
  }

  const getTransition0to1Coordinate = (t: number): Num3 => {
    const theta1 = getTheta1down()
    const distance = getRadius1() - ELEMENTOUCH_RADIUS_P
    const cartesianCoordinate = cylindricalToCartesian([
      radius0 + t * (getRadius1() - radius0),
      theta0 + t * (theta1 - theta0),
      z0 + t * (z1 - z0),
    ])
    const translatedCoordinate: Num3 = [
      cartesianCoordinate[0],
      cartesianCoordinate[1] + (-Math.abs(t - 1) + 1) * distance,
      cartesianCoordinate[2],
    ]
    return translatedCoordinate
  }

  const getTransition1to2Coordinate = (t: number): Num3 => {
    const theta1 = getTheta1up()
    const distance = getRadius1() - ELEMENTOUCH_RADIUS_P
    const cartesianCoordinate = cylindricalToCartesian([
      getRadius1() + (t - 1) * (radius2 - getRadius1()),
      theta1 + (t - 1) * (theta2 - theta1),
      z1 + (t - 1) * (z2 - z1),
    ])
    const translatedCoordinate: Num3 = [
      cartesianCoordinate[0],
      cartesianCoordinate[1] + (-Math.abs(t - 1) + 1) * distance,
      cartesianCoordinate[2],
    ]
    return translatedCoordinate
  }
  // const getTransition1to2Coordinate = (t) => {
  //     const theta1 = getTheta1up()
  //     const distance = getRadius1() - ELEMENTOUCH_RADIUS_P
  //     const cartesianCoordinate = cylindricalToCartesian([
  //         getRadius1() + (t - 1) * (radius2 - getRadius1()),
  //         theta1 + (t - 1) * (theta2 - theta1),
  //         z1 + (t - 1) * (z2 - z1)
  //     ])
  //     const translatedCoordinate = [cartesianCoordinate[0], cartesianCoordinate[1] + (-Math.abs(t - 1) + 1) * distance, cartesianCoordinate[2]]
  //     return translatedCoordinate
  // }
  const getTransition2to3Coordinate = (t: number) => {
    const distance = getRadius3() - ELEMENTOUCH_RADIUS_P
    const cartesianCoordinate = cylindricalToCartesian([
      radius2 + (t - 2) * (getRadius3() - radius2),
      theta2 + Math.pow(t - 2, 1) * (getTheta3down() - theta2),
      z2 + (t - 2) * (z3 - z2),
    ])
    const translatedCoordinate: Num3 = [
      cartesianCoordinate[0],
      cartesianCoordinate[1] + (-Math.abs(t - 1) + 1) * distance,
      cartesianCoordinate[2],
    ]
    return translatedCoordinate

    // return [
    //     orbitalPosition[0] + (t - 2) * (getCircularPosition(props.atomicNumber)[0] - orbitalPosition[0]),
    //     orbitalPosition[1] + (t - 2) * (getCircularPosition(props.atomicNumber)[1] - orbitalPosition[1]),
    //     orbitalPosition[2] + (t - 2) * (getCircularPosition(props.atomicNumber)[2] - orbitalPosition[2])
    // ]
  }

  const getTransition3to4Coordinate = (t: number): Num3 => {
    const distance = getRadius3() - ELEMENTOUCH_RADIUS_P
    const revaluedTheta0 = theta0 < (1 * Math.PI) / 2 ? theta0 + 2 * Math.PI : theta0
    const cartesianCoordinate = cylindricalToCartesian([
      getRadius3() + Math.pow(t - 3, 0.5) * (radius4 - getRadius3()),
      getTheta3up() + Math.pow(t - 3, 0.7) * (theta4 - getTheta3up()),
      z3 + (t - 3) * (z4 - z3),
    ])
    const translatedCoordinate: Num3 = [
      cartesianCoordinate[0],
      cartesianCoordinate[1] - Math.abs(4 - t) * distance,
      cartesianCoordinate[2],
    ]
    return translatedCoordinate
  }

  // const getTransition3to4Coordinate = (t) => {
  //     const revaluedTheta0 = theta0 < 1*Math.PI/2 ? theta0 + 2 * Math.PI : theta0
  //     const cartesianCoordinate = cylindricalToCartesian([
  //         radius3 + (t-3) * (radius0 - radius3),
  //         theta3 + Math.pow(t-3,3)* (revaluedTheta0 - theta3),
  //         z3 + (t-3) * (z0 - z3)
  //     ])
  //     return cartesianCoordinate
  // }

  const getTransition4to5Coordinate = (t: number): Num3 => {
    const tablePosition: Num3 = getTablePosition(element["atomicNumber"])
    return [
      orbitalPosition[0] + (t - 4) * (tablePosition[0] - orbitalPosition[0]),
      orbitalPosition[1] + (t - 4) * (tablePosition[1] - orbitalPosition[1]),
      orbitalPosition[2] + (t - 4) * (tablePosition[2] - orbitalPosition[2]),
    ]
  }

  const getCoordinate = (t: number): Num3 => {
    t = t % props.numberOfShapes
    if (0 <= t && t <= 1) {
      return getTransition0to1Coordinate(t)
    } else if (1 < t && t <= 2) {
      return getTransition1to2Coordinate(t)
    } else if (2 < t && t <= 3) {
      return getTransition2to3Coordinate(t)
    } else if (3 < t && t <= 4) {
      return getTransition3to4Coordinate(t)
    } else if (4 < t && t <= 5) {
      return getTransition4to5Coordinate(t)
    }
  }
  const getTilt = (t: number): Num3 => {
    t = t % props.numberOfShapes
    if (0 <= t && t <= 1) {
      return [0, 0, 0]
    } else if (1 < t && t <= 2) {
      return [(-Math.PI / 2) * Math.pow(t - 1, 10), 0, 0]
    } else if (2 < t && t <= 3) {
      return [(-Math.PI / 2) * Math.pow(3 - t, 0.4), 0, 0]
    } else if (3 < t && t <= 4) {
      // return [-Math.PI/2 * Math.pow(4-t,10) ,0,0]
      return [0, 0, 0]
    } else if (4 < t && t <= 5) {
      return [0, 0, 0]
    }
  }

  const getRotationAngle = (t: number): [number, number, number] => {
    t = t % props.numberOfShapes
    return [0, 0, 0]
    //   if (t >= 0 && t <= 1) {
    //       const theta1 = getTheta1down()
    //       const baseTheta = theta0 + t * (theta1 - theta0)

    //       return [0, 0, revalueTheta(baseTheta + Math.PI * 1.1 / 2) * t]
    //   } else if (t > 1 && t <= 2) {
    //       const theta1 = getTheta1up()
    //       const baseTheta = theta1 + (t - 1) * (theta2 - theta1)

    //       return [0, 0, baseTheta + Math.PI * 1.1 / 2]
    //   } else if (t > 2 && t <= 3) {
    //       const baseTheta = theta2 + Math.pow((t - 2), 1 / 2) * (getTheta3down() - theta2)
    //       return [0, 0, baseTheta + Math.PI * 1.1 / 2]
    //   } else if (t > 3 && t <= 4) {
    //       const revaluedTheta0 = theta0

    //       return [0, 0, revalueTheta(getTheta3up() + Math.pow(t - 3, 2) * (revaluedTheta0 - getTheta3up()) + Math.PI * 1.1 / 2) * (4 - t)]

    //   } else {
    //       return [0, 0, 0]
    //   }
  }

  // const handleElementClick = () => {
  //     props.setAtomicNumber(props.atomicNumber)
  //     props.setIsModalVisible(1)
  // }

  // const handleDetailClick = () => {
  //     console.log('clicked')
  // }

  return (
    <>
      <animated.mesh //{...props}
        position={transitionParameter.to((t) => getCoordinate(t))}
        onPointerOver={() => handlePointerOver()}
        onPointerOut={() => handlePointerOut()}
        scale={scale}
        //   onClick={handleElementClick}
        rotation={transitionParameter.to((t) => getRotationAngle(t))[1]}
      >
        <group>
          <animated.mesh //{...props}
            rotation={transitionParameter.to((t) => getTilt(t))[1]}
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
              opacity={1}
            />
            {
              (props.selectedAtomicNumber === element.atomicNumber) &&
              <FocusFrame {...props}
                  points={[
                      [0, 0, 0],
                      [0, 0, -cardHeight],
                      [cardWidth, 0, -cardHeight],
                      [cardWidth, 0, 0]
                  ]}
                  color={getColor()}
              />
            }
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
                position={[0.4, -0.5, 0.01]}
                fontSize={0.5}
                color={
                  props.characteristicCount % props.numberOfCharacteristics <= 2 ? "#000" : "#fff"
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

          {/* //   <Html
        //       zIndexRange={[100, 200]}
        //       onClick={() => console.log('clicked')}
        //   >
        //       <div
        //               onPointerOver={() => handleBubblePointerOver()}
        //               onPointerOut={() => handleBubblePointerOut()}
        //               // onClick = {()=>console.log('clicked')}
        //           >
        //               {
        //                   (hovered || bubbleHovered) &&
        //                   <ElementBubble
        //                       {...props}
        //                       backgroundColor={color}
        //                       textColor={color}
        //                       element={element}
        //                       // onClick={handleElementClick}
        //                   />
        //               }
        //           </div>
        //   </Html> */}
        </group>
      </animated.mesh>
    </>
  )
}

export default Element

// const handleDetailClick = () =>{
//     console.log('clicked')
// }

// const ElementBubble = (props) => {

//   return (
//       <StyledElementBubble >
//           <div onClick={props.onClick} style={{ textAlign: 'left', color: 'blue' }}>
//               <span className='modalLink'>
//                   詳細をみる
//               </span>
//           </div>
//           <div style={{ textAlign: 'left' }}>
//               {props.atomicNumber}
//           </div>
//           <div style={{ textAlign: 'center' }}>
//               {props.element.name}
//           </div>

//           <div style={{ textAlign: 'left', marginLeft: '20px' }}>
//               {Object.entries(props.element.electron).map(([key, value]) => (
//                   <div key={key}>
//                       {key}:&nbsp;&nbsp;&nbsp;&nbsp;
//                       {/* <ul> */}
//                       {Object.entries(value).map(([subKey, subValue]) => (
//                           <span key={subKey}>{subValue}&nbsp;</span>
//                       ))}
//                       {/* </ul> */}
//                   </div>
//               ))}
//           </div>

//           <div
//               className='colorRectangle'
//               onClick={props.onElementClick}
//           />
//           <div onClick={props.onElementClick}>
//               <span className='modalLink'>
//               </span>
//           </div>
//       </StyledElementBubble>)
// }

// const StyledElementBubble = styled.div`
//   position:absolute;
//   top:40px;
//   left:40px;
//   width: 120px;
//   background: #fff;
//   border-radius: 0px 24px 24px 24px;
//   font-size: 12px;
//   padding: 4px;
//   text-align:center;
//   .modalLink{
//       color:#0000FF;
//       cursor: pointer;
//       text-decoration: underline;
//   }
//   div{
//       margin: 0 auto;
//   }
// `;
