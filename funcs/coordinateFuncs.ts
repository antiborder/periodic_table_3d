import elements from "../constants/elements"
import {shapeData} from "../constants/shapes"
import TablePosition from "../domain/TablePosition"
import OrbitalPosition from "../domain/OrbitalPosition"
import CurledPosition from "../domain/CurledPosition"
import DiscPosition from "../domain/DiscPosition"


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
  const tablePosition = new TablePosition(atomicNumber)
  const curledPosition= new CurledPosition(atomicNumber)
  const distance = curledPosition.radius() - ELEMENTOUCH_RADIUS_P
  const cartesianCoordinate = cylindricalToCartesian([
    tablePosition.radius() + t * (curledPosition.radius() - tablePosition.radius()),
    tablePosition.theta() + t * (curledPosition.thetaDown() - tablePosition.theta()),
    tablePosition.z() + t * (curledPosition.z() - tablePosition.z()),
  ])
  const translatedCoordinate: Num3 = [
    cartesianCoordinate[0],
    cartesianCoordinate[1] + (-Math.abs(t - 1) + 1) * distance,
    cartesianCoordinate[2],
  ]
  return translatedCoordinate
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
export {cartesianToCylindrical}

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

const getTransition1to2Coordinate = (t: number, atomicNumber: number): Num3 => {
  const curledPosition = new CurledPosition(atomicNumber)
  const discPosition = new DiscPosition(atomicNumber)
  const theta1 = curledPosition.thetaUp()
  const distance = curledPosition.radius() - ELEMENTOUCH_RADIUS_P
  const cartesianCoordinate = cylindricalToCartesian([
    curledPosition.radius() + (t - 1) * (discPosition.radius() - curledPosition.radius()),
    theta1 + (t - 1) * (discPosition.theta() - theta1),
    curledPosition.z() + (t - 1) * (discPosition.z() - curledPosition.z()),
  ])
  const translatedCoordinate: Num3 = [
    cartesianCoordinate[0],
    cartesianCoordinate[1] + (-Math.abs(t - 1) + 1) * distance,
    cartesianCoordinate[2],
  ]
  return translatedCoordinate
}

const getTransition2to3Coordinate = (t: number, atomicnumber: number): Num3 => {
  const discPosition = new DiscPosition(atomicnumber)
  const distance = getRadius3(atomicnumber) - ELEMENTOUCH_RADIUS_P
  const cartesianCoordinate = cylindricalToCartesian([
    discPosition.radius() + (t - 2) * (getRadius3(atomicnumber) - discPosition.radius()),
    discPosition.theta() +
      Math.pow(t - 2, 1) * (getTheta3down(atomicnumber) - discPosition.theta()),
      discPosition.z() + (t - 2) * (z3(atomicnumber) - discPosition.z()),
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
  const orbitalPosition = new OrbitalPosition(atomicNumber)
  const distance = getRadius3(atomicNumber) - ELEMENTOUCH_RADIUS_P
  const cartesianCoordinate = cylindricalToCartesian([
    getRadius3(atomicNumber) +
      Math.pow(t - 3, 0.5) * (orbitalPosition.radius() - getRadius3(atomicNumber)),
    getTheta3up(atomicNumber) +
      Math.pow(t - 3, 0.7) * (orbitalPosition.theta() - getTheta3up(atomicNumber)),
    z3(atomicNumber) + (t - 3) * (orbitalPosition.z() - z3(atomicNumber)),
  ])
  const translatedCoordinate: Num3 = [
    cartesianCoordinate[0],
    cartesianCoordinate[1] - Math.abs(4 - t) * distance,
    cartesianCoordinate[2],
  ]
  return translatedCoordinate
}

const revalueTheta = (theta) => {
  return Math.PI < theta ? theta - 2 * Math.PI : theta
}

const getTransition4to5Coordinate = (t: number, atomicNumber: number): Num3 => {
  const tablePosition =  new TablePosition(atomicNumber).getTablePosition()
  const orbitalPosition = new OrbitalPosition(atomicNumber).orbitalPosition()
  return [
    orbitalPosition[0] +
      (t - 4) * (tablePosition[0] - orbitalPosition[0]),
    orbitalPosition[1] +
      (t - 4) * (tablePosition[1] - orbitalPosition[1]),
    orbitalPosition[2] +
      (t - 4) * (tablePosition[2] - orbitalPosition[2]),
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
  const tablePosition = new TablePosition(atomicNumber)
  const curledPosition = new CurledPosition(atomicNumber)
  const discPosition = new DiscPosition(atomicNumber)
  const theta0 = tablePosition.theta()
  if (t >= 0 && t <= 1) {
    const theta1 = curledPosition.thetaDown()

    const baseTheta = theta0 + t * (theta1 - theta0)

    return [0, 0, revalueTheta(baseTheta + (Math.PI * 1.1) / 2) * t]
  } else if (t > 1 && t <= 2) {
    const theta1 = curledPosition.thetaUp()
    const baseTheta = theta1 + (t - 1) * (discPosition.theta() - theta1)

    return [0, 0, baseTheta + (Math.PI * 1.1) / 2]
  } else if (t > 2 && t <= 3) {
    const baseTheta =
    discPosition.theta() +
      Math.pow(t - 2, 1 / 2) * (getTheta3down(atomicNumber) - discPosition.theta())
    return [0, 0, baseTheta + (Math.PI * 1.1) / 2]
  } else if (t > 3 && t <= 4) {
    const revaluedTheta0 = theta0

    return [
      0,
      0,
      revalueTheta(
        getTheta3up(atomicNumber) +
          Math.pow(t - 3, 2) * (revaluedTheta0 - getTheta3up(atomicNumber)) +
          (Math.PI * 1.1) / 2
      ) *
        (4 - t),
    ]
  } else {
    return [0, 0, 0]
  }
}
export { getRotationAngle }