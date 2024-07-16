import elements from "../constants/elements"
import {shapeData} from "../constants/shapes"

const SPIRAL_RADIUS_P = 1.8
const SPIRAL_RADIUS_D = 4
const SPIRAL_RADIUS_F = 7

const ELEMENTOUCH_RADIUS_P = 2.0
const ELEMENTOUCH_RADIUS_D = 2.4
const ELEMENTOUCH_RADIUS_F = 3.6

type Num3 = [number, number, number]

const getCoordinate = (shapeCount: number, atomicNumber: number): Num3 => {
  let t = shapeCount % Object.keys(shapeData).length
  if (0 <= t && t <= 1) {
    return getTransition0to1Coordinate(t, atomicNumber)
  } else if (1 < t && t <= 2) {
    return getTransition1to2Coordinate(t, atomicNumber)
  } else if (2 < t && t <= 3) {
    return getTransition2to3Coordinate(t, atomicNumber)
  } else if (3 < t && t <= 4) {
    return getTransition3to4Coordinate(t, atomicNumber)
  } else if (4 < t && t <= 5) {
    return getTransition4to5Coordinate(t, atomicNumber)
  }
}
export { getCoordinate }

const getTransition0to1Coordinate = (t: number, atomicNumber: number): Num3 => {
  const theta1 = getTheta1down(atomicNumber)
  const distance = getRadius1(atomicNumber) - ELEMENTOUCH_RADIUS_P
  const cartesianCoordinate = cylindricalToCartesian([
    radius0(atomicNumber) + t * (getRadius1(atomicNumber) - radius0(atomicNumber)),
    theta0(atomicNumber) + t * (theta1 - theta0(atomicNumber)),
    z0(atomicNumber) + t * (z1(atomicNumber) - z0(atomicNumber)),
  ])
  const translatedCoordinate: Num3 = [
    cartesianCoordinate[0],
    cartesianCoordinate[1] + (-Math.abs(t - 1) + 1) * distance,
    cartesianCoordinate[2],
  ]
  return translatedCoordinate
}

const radius0 = (atomicNumber: number): number => {
  return cartesianToCylindrical(getTablePosition(atomicNumber))[0]
}
const theta0 = (atomicNumber: number): number => {
  return cartesianToCylindrical(getTablePosition(atomicNumber))[1]
}
const z0 = (atomicNumber: number): number => {
  return cartesianToCylindrical(getTablePosition(atomicNumber))[2]
}

const getOrbitNumber = (orbit): number => {
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

const getTableBasePosition = (atomicNumber: number): Num3 => {
  return [elements[atomicNumber].tableColumn, 0, -elements[atomicNumber].tableRow]
}

const translateTablePosition = (position: Num3): Num3 => {
  return [position[0] - 13, position[1] - 6, position[2]]
}

const getTablePosition = (atomicNumber: number): Num3 => {
  return translateTablePosition(getTableBasePosition(atomicNumber))
}

const getOrbitalPositionX = (atomicNumber: number): number => {
  let x = 0
  let shellNumber = parseInt(elements[atomicNumber].orbit.slice(0, 1))
  let orbitNumber = getOrbitNumber(elements[atomicNumber].orbit.slice(-1))
  switch (orbitNumber) {
    case 1:
      if (elements[atomicNumber].atomicNumber === 2 || elements[atomicNumber].atomicNumber === 1) {
        x = elements[atomicNumber].spiralColumn - 4
      } else {
        x = elements[atomicNumber].spiralColumn - 6
      }
      break
    case 2:
      if (shellNumber === 2 || shellNumber === 3) {
        x = elements[atomicNumber].spiralColumn % 8
      } else {
        x = elements[atomicNumber].spiralColumn % 10
      }
      break
    case 3:
      if (
        atomicNumber === 21 ||
        atomicNumber === 39 ||
        atomicNumber === 71 ||
        atomicNumber === 103
      ) {
        x = 0
      } else {
        x = elements[atomicNumber].spiralColumn
      }
      break
    default:
      if (atomicNumber === 57 || atomicNumber === 89) {
        x = 0
      } else {
        x = elements[atomicNumber].spiralColumn
      }
  }
  return x
}

const orbitalPosition = (atomicNumber: number): Num3 => {
  return [
    getOrbitalPositionX(atomicNumber),
    +3 * getOrbitNumber(elements[atomicNumber].orbit.slice(-1)) - 6,
    -2 * parseInt(elements[atomicNumber].orbit.slice(0)),
  ]
}

const getElementouchPeriod = (atomicNumber: number): number => {
  let period = 0
  switch (elements[atomicNumber]["spiralRow"]) {
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

const getSpiralPeriod = (atomicNumber: number): number => {
  let period = 0
  switch (elements[atomicNumber]["tableRow"]) {
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

const getRadius1 = (atomicNumber: number): number => {
  let radius: number = 0
  switch (elements[atomicNumber]["tableRow"]) {
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
const getTheta1down = (atomicNumber: number): number => {
  let baseTheta = 0
  switch (elements[atomicNumber].tableRow) {
    case 1:
    case 2:
    case 3:
      baseTheta =
        elements[atomicNumber].tableColumn <= 2
          ? ((elements[atomicNumber].tableColumn - 3.5) / getSpiralPeriod(atomicNumber)) *
            2 *
            Math.PI
          : ((elements[atomicNumber].tableColumn - 13.5) / getSpiralPeriod(atomicNumber)) *
            2 *
            Math.PI
      break
    case 4:
    case 5:
      baseTheta = ((elements[atomicNumber].tableColumn - 6) / 18) * 2 * Math.PI
      break
    case 6:
    case 7:
      baseTheta =
        elements[atomicNumber].tableColumn <= 2
          ? ((elements[atomicNumber].tableColumn - 9.5) / getSpiralPeriod(atomicNumber)) *
            2 *
            Math.PI
          : ((elements[atomicNumber].tableColumn + 4.5) / getSpiralPeriod(atomicNumber)) *
            2 *
            Math.PI
      break
    case 9:
    case 10:
      baseTheta =
        ((elements[atomicNumber].tableColumn - 9.5) / getSpiralPeriod(atomicNumber)) * 2 * Math.PI

      break
    default:
      baseTheta = elements[atomicNumber].tableColumn - 1
  }
  let adjustedTheta = baseTheta //- Math.PI * 4.1 / 8
  return adjustedTheta
}
const getTheta1up = (atomicNumber: number): number => {
  return getTheta1down(atomicNumber)
}
const z1 = (atomicNumber: number): number => {
  const { tableRow, tableColumn } = elements[atomicNumber]

  switch (true) {
    case tableRow <= 3 && tableColumn >= 13:
      return -tableRow - (tableColumn - 11) / 8
    case tableRow <= 5:
      return -tableRow - tableColumn / 18
    case tableRow >= 8:
      return -tableRow + 3 - tableColumn / 32
    case tableColumn <= 2:
      return -tableRow - tableColumn / 32
    default:
      return -tableRow - (tableColumn + 14) / 32
  }
}

const getTransition1to2Coordinate = (t: number, atomicNumber: number): Num3 => {
  const theta1 = getTheta1up(atomicNumber)
  const distance = getRadius1(atomicNumber) - ELEMENTOUCH_RADIUS_P
  const cartesianCoordinate = cylindricalToCartesian([
    getRadius1(atomicNumber) + (t - 1) * (radius2(atomicNumber) - getRadius1(atomicNumber)),
    theta1 + (t - 1) * (theta2(atomicNumber) - theta1),
    z1(atomicNumber) + (t - 1) * (z2 - z1(atomicNumber)),
  ])
  const translatedCoordinate: Num3 = [
    cartesianCoordinate[0],
    cartesianCoordinate[1] + (-Math.abs(t - 1) + 1) * distance,
    cartesianCoordinate[2],
  ]
  return translatedCoordinate
}

const radius2 = (atomicNumber: number): number => {
  if (elements[atomicNumber]["tableRow"] <= 7) {
    return elements[atomicNumber]["tableRow"] + 2 + elements[atomicNumber]["tableColumn"] / 18
  } else {
    return elements[atomicNumber]["tableRow"] - 1 + elements[atomicNumber]["tableColumn"] / 32
  }
}
const theta2 = (atomicNumber: number) => {
  return elements[atomicNumber]["tableRow"] <= 7
    ? elements[atomicNumber]["tableColumn"] <= 2
      ? (elements[atomicNumber]["tableColumn"] / 32) * 2 * Math.PI - (Math.PI * 3) / 4
      : ((elements[atomicNumber]["tableColumn"] + 14) / 32) * 2 * Math.PI - (Math.PI * 3) / 4
    : (elements[atomicNumber]["tableColumn"] / 32) * 2 * Math.PI - (Math.PI * 3) / 4
}
const z2 = -12

const getTransition2to3Coordinate = (t: number, atomicnumber: number): Num3 => {
  const distance = getRadius3(atomicnumber) - ELEMENTOUCH_RADIUS_P
  const cartesianCoordinate = cylindricalToCartesian([
    radius2(atomicnumber) + (t - 2) * (getRadius3(atomicnumber) - radius2(atomicnumber)),
    theta2(atomicnumber) +
      Math.pow(t - 2, 1) * (getTheta3down(atomicnumber) - theta2(atomicnumber)),
    z2 + (t - 2) * (z3(atomicnumber) - z2),
  ])
  const translatedCoordinate: Num3 = [
    cartesianCoordinate[0],
    cartesianCoordinate[1] + (-Math.abs(t - 1) + 1) * distance,
    cartesianCoordinate[2],
  ]
  return translatedCoordinate
}

const getRadius3 = (atomicNumber: number): number => {
  let radius = 0
  switch (elements[atomicNumber]["spiralRow"]) {
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
const getTheta3down = (atomicNumber) => {
  let baseTheta = elements[atomicNumber].spiralColumn - (1 % getElementouchPeriod(atomicNumber))
  let adjustedTheta =
    (baseTheta / getElementouchPeriod(atomicNumber)) * 2 * Math.PI -
    (Math.PI * 4.1) / 8 +
    Math.PI -
    2 * Math.PI * elements[atomicNumber]["winding"]
  return adjustedTheta
}
const getTheta3up = (atomicNumber) => {
  let winding = 0
  switch (elements[atomicNumber]["orbit"].slice(-1)) {
    case "s":
      winding = -1
      break
    case "p":
      winding = getOrbitalPositionX(atomicNumber) === 0 ? -2 : -1
      break
    case "d":
      winding = getOrbitalPositionX(atomicNumber) === 0 ? -2 : -1
      break
    case "f":
      winding = getOrbitalPositionX(atomicNumber) === 0 ? -2 : -1
      break
    default:
  }

  let baseTheta = elements[atomicNumber].spiralColumn - (1 % getElementouchPeriod(atomicNumber))
  let adjustedTheta =
    (baseTheta / getElementouchPeriod(atomicNumber)) * 2 * Math.PI -
    (Math.PI * 4.1) / 8 +
    Math.PI +
    2 * Math.PI * winding
  return adjustedTheta
}
const z3 = (atomicNumber) =>
  -elements[atomicNumber].spiralRow -
  elements[atomicNumber].spiralColumn / getElementouchPeriod(atomicNumber)

const getTransition3to4Coordinate = (t: number, atomicNumber: number): Num3 => {
  const distance = getRadius3(atomicNumber) - ELEMENTOUCH_RADIUS_P
  const cartesianCoordinate = cylindricalToCartesian([
    getRadius3(atomicNumber) +
      Math.pow(t - 3, 0.5) * (radius4(atomicNumber) - getRadius3(atomicNumber)),
    getTheta3up(atomicNumber) +
      Math.pow(t - 3, 0.7) * (theta4(atomicNumber) - getTheta3up(atomicNumber)),
    z3(atomicNumber) + (t - 3) * (z4(atomicNumber) - z3(atomicNumber)),
  ])
  const translatedCoordinate: Num3 = [
    cartesianCoordinate[0],
    cartesianCoordinate[1] - Math.abs(4 - t) * distance,
    cartesianCoordinate[2],
  ]
  return translatedCoordinate
}

const radius4 = (atomicNumber) => {
  return cartesianToCylindrical(orbitalPosition(atomicNumber))[0]
}
const theta4 = (atomicNumber) => {
  return cartesianToCylindrical(orbitalPosition(atomicNumber))[1]
}
const z4 = (atomicNumber) => {
  return cartesianToCylindrical(orbitalPosition(atomicNumber))[2]
}

const revalueTheta = (theta) => {
  return Math.PI < theta ? theta - 2 * Math.PI : theta
}

const getTransition4to5Coordinate = (t: number, atomicNumber: number): Num3 => {
  const tablePosition = getTablePosition(atomicNumber)
  return [
    orbitalPosition(atomicNumber)[0] +
      (t - 4) * (tablePosition[0] - orbitalPosition(atomicNumber)[0]),
    orbitalPosition(atomicNumber)[1] +
      (t - 4) * (tablePosition[1] - orbitalPosition(atomicNumber)[1]),
    orbitalPosition(atomicNumber)[2] +
      (t - 4) * (tablePosition[2] - orbitalPosition(atomicNumber)[2]),
  ]
}

const getTilt = (t: number): Num3 => {
  t = t % Object.keys(shapeData).length
  if (0 <= t && t <= 1) {
    return [0, 0, 0]
  } else if (1 < t && t <= 2) {
    return [(-Math.PI / 2) * Math.pow(t - 1, 10), 0, 0]
  } else if (2 < t && t <= 3) {
    return [(-Math.PI / 2) * Math.pow(3 - t, 0.4), 0, 0]
  } else if (3 < t && t <= 4) {
    return [0, 0, 0]
  } else if (4 < t && t <= 5) {
    return [0, 0, 0]
  }
}
export { getTilt }

const getRotationAngle = (t: number, atomicNumber: number): Num3 => {
  t = t % Object.keys(shapeData).length
  if (t >= 0 && t <= 1) {
    const theta1 = getTheta1down(atomicNumber)
    const baseTheta = theta0(atomicNumber) + t * (theta1 - theta0(atomicNumber))

    return [0, 0, revalueTheta(baseTheta + (Math.PI * 1.1) / 2) * t]
  } else if (t > 1 && t <= 2) {
    const theta1 = getTheta1up(atomicNumber)
    const baseTheta = theta1 + (t - 1) * (theta2(atomicNumber) - theta1)

    return [0, 0, baseTheta + (Math.PI * 1.1) / 2]
  } else if (t > 2 && t <= 3) {
    const baseTheta =
      theta2(atomicNumber) +
      Math.pow(t - 2, 1 / 2) * (getTheta3down(atomicNumber) - theta2(atomicNumber))
    return [0, 0, baseTheta + (Math.PI * 1.1) / 2]
  } else if (t > 3 && t <= 4) {
    const revaluedTheta0 = theta0

    return [
      0,
      0,
      revalueTheta(
        getTheta3up(atomicNumber) +
          Math.pow(t - 3, 2) * (revaluedTheta0(atomicNumber) - getTheta3up(atomicNumber)) +
          (Math.PI * 1.1) / 2
      ) *
        (4 - t),
    ]
  } else {
    return [0, 0, 0]
  }
}
export { getRotationAngle }