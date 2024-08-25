import elements from "../constants/elements"
import { cartesianToCylindrical, getOrbitalPositionX } from "../utils/coordinateFuncs"
import { orbitNumber, shellNumber } from "../utils/elementFuncs"

type Num3 = [number, number, number]

class OrbitalPosition {
  private atomicNumber: number

  constructor(atomicNumber: number) {
    this.atomicNumber = atomicNumber
  }

  public orbitalPosition(): Num3 {
    return [
      getOrbitalPositionX(this.atomicNumber),
      +3 * orbitNumber(this.atomicNumber) - 6,
      -2 * shellNumber(this.atomicNumber),
    ]
  }

  public radius(): number {
    return cartesianToCylindrical(this.orbitalPosition())[0]
  }

  public theta(): number {
    return cartesianToCylindrical(this.orbitalPosition())[1] - this.winding() * 2 * Math.PI
  }

  private winding(): number {
    switch (elements[this.atomicNumber].orbit.slice(-1)) {
      case "s":
        return 0
      case "p":
        return 1
      case "d":
        return 1
      case "f":
        return 2
      default:
        return 0
    }
  }

  public z(): number {
    return cartesianToCylindrical(this.orbitalPosition())[2]
  }
}
export default OrbitalPosition
