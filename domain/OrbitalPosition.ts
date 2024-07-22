import elements from '../constants/elements'

type Num3 = [number, number, number]

class OrbitalPosition {

    private atomicNumber: number

    constructor(atomicNumber: number) {
      this.atomicNumber = atomicNumber
    }

    public orbitalPosition(): Num3 {
      return [
        this.getOrbitalPositionX(),
        +3 * this.getOrbitNumber(elements[this.atomicNumber].orbit.slice(-1)) - 6,
        -2 * parseInt(elements[this.atomicNumber].orbit.slice(0)),
      ]
    }

    private getOrbitalPositionX(): number  {
        let x = 0
        let shellNumber = parseInt(elements[this.atomicNumber].orbit.slice(0, 1))
        let orbitNumber = this.getOrbitNumber(elements[this.atomicNumber].orbit.slice(-1))
        switch (orbitNumber) {
          case 1:
            if (elements[this.atomicNumber].atomicNumber === 2 || elements[this.atomicNumber].atomicNumber === 1) {
              x = elements[this.atomicNumber].spiralColumn - 4
            } else {
              x = elements[this.atomicNumber].spiralColumn - 6
            }
            break
          case 2:
            if (shellNumber === 2 || shellNumber === 3) {
              x = elements[this.atomicNumber].spiralColumn % 8
            } else {
              x = elements[this.atomicNumber].spiralColumn % 10
            }
            break
          case 3:
            if (
                this.atomicNumber === 21 ||
                this.atomicNumber === 39 ||
                this.atomicNumber === 71 ||
                this.atomicNumber === 103
            ) {
              x = 0
            } else {
              x = elements[this.atomicNumber].spiralColumn
            }
            break
          default:
            if (this.atomicNumber === 57 || this.atomicNumber === 89) {
              x = 0
            } else {
              x = elements[this.atomicNumber].spiralColumn
            }
        }
        return x
      }


      private getOrbitNumber (orbit): number  {
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




}
export default OrbitalPosition