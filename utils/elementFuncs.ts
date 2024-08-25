import elements from "../constants/elements"
import constants from "../constants/constants"

export const orbitNumber = (atomicNumber: Number): number => {
  return constants.ORBIT_NUMBER[orbitName(atomicNumber)]
}

export const shellNumber = (atomicNumber: Number): number => {
  return parseInt(orbit(atomicNumber).slice(0))
}

export const orbit = (atomicNumber: Number): string => {
  return elements[atomicNumber].orbit
}

export const orbitName = (atomicNumber: Number): string => {
  return orbit(atomicNumber).slice(-1)
}
