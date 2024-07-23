import { shapeData } from "../constants/shapes"

import TablePosition from "./TablePosition"
import OrbitalPosition from "./OrbitalPosition"
import CurledPosition from "./CurledPosition"
import DiscPosition from "./DiscPosition"
import ElementouchPosition from "./ElementouchPosition"

import {Num3, cylindricalToCartesian} from "../utils/coordinateFuncs"

const BASE_DISTANCE = 2.0

class CardPosition {
  private atomicNumber: number

  constructor(atomicNumber: number) {
    this.atomicNumber = atomicNumber
  }

  coordinate (shapeCount: number): Num3 {
    let t = shapeCount % Object.keys(shapeData).length
    switch (true) {
      case 0 <= t && t <= 1:
        return this.getTransition0to1Coordinate(t, this.atomicNumber);
      case 1 < t && t <= 2:
        return this.getTransition1to2Coordinate(t, this.atomicNumber);
      case 2 < t && t <= 3:
        return this.getTransition2to3Coordinate(t, this.atomicNumber);
      case 3 < t && t <= 4:
        return this.getTransition3to4Coordinate(t, this.atomicNumber);
      case 4 < t && t <= 5:
        return this.getTransition4to5Coordinate(t, this.atomicNumber);
      default:
        return [0, 0, 0];
    }
  }

  getTransition0to1Coordinate  (t: number, atomicNumber: number): Num3  {
    const tablePosition = new TablePosition(atomicNumber)
    const curledPosition = new CurledPosition(atomicNumber)

    const distance = curledPosition.radius() - BASE_DISTANCE
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

getTransition1to2Coordinate  (t: number, atomicNumber: number): Num3  {
    const curledPosition = new CurledPosition(atomicNumber)
    const discPosition = new DiscPosition(atomicNumber)

    const distance = curledPosition.radius() -  BASE_DISTANCE
    const cartesianCoordinate = cylindricalToCartesian([
      curledPosition.radius() + (t - 1) * (discPosition.radius() - curledPosition.radius()),
      curledPosition.thetaUp() + (t - 1) * (discPosition.theta() - curledPosition.thetaUp()),
      curledPosition.z() + (t - 1) * (discPosition.z() - curledPosition.z()),
    ])
    const translatedCoordinate: Num3 = [
      cartesianCoordinate[0],
      cartesianCoordinate[1] + (-Math.abs(t - 1) + 1) * distance,
      cartesianCoordinate[2],
    ]
    return translatedCoordinate
  }

  getTransition2to3Coordinate  (t: number, atomicnumber: number): Num3  {
    const discPosition = new DiscPosition(atomicnumber)
    const elementouchPosition = new ElementouchPosition(atomicnumber)

    const distance = elementouchPosition.radius() -  BASE_DISTANCE
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

   getTransition3to4Coordinate  (t: number, atomicNumber: number): Num3  {
    const orbitalPosition = new OrbitalPosition(atomicNumber)
    const elementouchPosition = new ElementouchPosition(atomicNumber)

    const distance = elementouchPosition.radius() - BASE_DISTANCE
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

  getTransition4to5Coordinate (t: number, atomicNumber: number): Num3  {
    const tablePosition = new TablePosition(atomicNumber).getTablePosition()
    const orbitalPosition = new OrbitalPosition(atomicNumber).orbitalPosition()

    return [
      orbitalPosition[0] + (t - 4) * (tablePosition[0] - orbitalPosition[0]),
      orbitalPosition[1] + (t - 4) * (tablePosition[1] - orbitalPosition[1]),
      orbitalPosition[2] + (t - 4) * (tablePosition[2] - orbitalPosition[2]),
    ]
  }

}
export default CardPosition
