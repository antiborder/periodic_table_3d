import elements from '../constants/elements'
import {cartesianToCylindrical, getOrbitalPositionX, getOrbitNumber} from '../funcs/coordinateFuncs'

type Num3 = [number, number, number]

class OrbitalPosition {

    private atomicNumber: number

    constructor(atomicNumber: number) {
      this.atomicNumber = atomicNumber
    }

    public orbitalPosition(): Num3 {
      return [
        getOrbitalPositionX(this.atomicNumber),
        +3 * getOrbitNumber(elements[this.atomicNumber].orbit.slice(-1)) - 6,
        -2 * parseInt(elements[this.atomicNumber].orbit.slice(0)),
      ]
    }

      public radius (): number {
        return cartesianToCylindrical(this.orbitalPosition())[0]
      }
      public theta (): number {
        return cartesianToCylindrical(this.orbitalPosition())[1]
      }
      public z (): number {
        return cartesianToCylindrical(this.orbitalPosition())[2]
      }




}
export default OrbitalPosition