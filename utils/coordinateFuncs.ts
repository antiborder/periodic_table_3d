import elements from "../constants/elements"
import { shapeData } from "../constants/shapes"

export type Num3 = [number, number, number]

export const cylindricalToCartesian = ([radius, theta, z]: Num3): Num3 => {
  return [radius * Math.cos(theta), radius * Math.sin(theta), z]
}

const cartesianToCylindrical = ([x, y, z]: Num3): Num3 => {
  return [Math.sqrt(x * x + y * y), Math.atan2(y, x), z]
}
export { cartesianToCylindrical }

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
export { getOrbitalPositionX }

const getOrbitNumber = (orbit: string): number => {
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
export { getOrbitNumber }


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