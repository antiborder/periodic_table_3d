import elements from "../constants/elements"
import {shapeData} from "../constants/shapes"
import TablePosition from "../domain/TablePosition"
import OrbitalPosition from "../domain/OrbitalPosition"
import CurledPosition from "../domain/CurledPosition"
import DiscPosition from "../domain/DiscPosition"
import ElementouchPosition from "../domain/ElementouchPosition"


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
export {getOrbitalPositionX}

const getOrbitNumber = (orbit:string): number => {
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
export {getOrbitNumber}


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
  const elementouchPosition = new ElementouchPosition(atomicnumber)
  const distance = elementouchPosition.radius() - ELEMENTOUCH_RADIUS_P
  const cartesianCoordinate = cylindricalToCartesian([
    discPosition.radius() + (t - 2) * (elementouchPosition.radius() - discPosition.radius()),
    discPosition.theta() +
      Math.pow(t - 2, 1) * (elementouchPosition.thetaUp() - discPosition.theta()),
      discPosition.z() + (t - 2) * (elementouchPosition.z() - discPosition.z()),
  ])
  const translatedCoordinate: Num3 = [
    cartesianCoordinate[0],
    cartesianCoordinate[1] + (-Math.abs(t - 1) + 1) * distance,
    cartesianCoordinate[2],
  ]
  return translatedCoordinate
}

const getTransition3to4Coordinate = (t: number, atomicNumber: number): Num3 => {
  const orbitalPosition = new OrbitalPosition(atomicNumber)
  const elementouchPosition = new ElementouchPosition(atomicNumber)
  const distance = elementouchPosition.radius() - ELEMENTOUCH_RADIUS_P
  const cartesianCoordinate = cylindricalToCartesian([
    elementouchPosition.radius() +
      Math.pow(t - 3, 0.5) * (orbitalPosition.radius() - elementouchPosition.radius()),
      elementouchPosition.thetaUp() +
      Math.pow(t - 3, 0.7) * (orbitalPosition.theta() - elementouchPosition.thetaUp()),
    elementouchPosition.z() + (t - 3) * (orbitalPosition.z() - elementouchPosition.z()),
  ])

  const translatedCoordinate: Num3 = [
    cartesianCoordinate[0],
    cartesianCoordinate[1] - Math.abs(4 - t) * distance,
    cartesianCoordinate[2],
  ]
  return translatedCoordinate
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
  const elementouchPosition = new ElementouchPosition(atomicNumber)
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
      Math.pow(t - 2, 1 / 2) * (elementouchPosition.thetaDown() - discPosition.theta())
    return [0, 0, baseTheta + (Math.PI * 1.1) / 2]
  } else if (t > 3 && t <= 4) {
    const revaluedTheta0 = theta0

    return [
      0,
      0,
      revalueTheta(
        elementouchPosition.thetaUp() +
          Math.pow(t - 3, 2) * (revaluedTheta0 - elementouchPosition.thetaUp()) +
          (Math.PI * 1.1) / 2
      ) *
        (4 - t),
    ]
  } else {
    return [0, 0, 0]
  }
}
export { getRotationAngle }

const revalueTheta = (theta) => {
  return Math.PI < theta ? theta - 2 * Math.PI : theta
}
