import elements from "../constants/elements"

const SPIRAL_RADIUS_P = 1.8
const SPIRAL_RADIUS_D = 4
const SPIRAL_RADIUS_F = 7

class CurledPosition {
  private atomicNumber: number

  constructor(atomicNumber: number) {
    this.atomicNumber = atomicNumber
  }

  private getSpiralPeriod(): number {
    let period = 0
    switch (elements[this.atomicNumber]["tableRow"]) {
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

  radius(): number {
    let radius: number = 0
    switch (elements[this.atomicNumber]["tableRow"]) {
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
  thetaDown(): number {
    let baseTheta = 0
    switch (elements[this.atomicNumber].tableRow) {
      case 1:
      case 2:
      case 3:
        baseTheta =
          elements[this.atomicNumber].tableColumn <= 2
            ? ((elements[this.atomicNumber].tableColumn - 3.5) / this.getSpiralPeriod()) *
              2 *
              Math.PI
            : ((elements[this.atomicNumber].tableColumn - 13.5) / this.getSpiralPeriod()) *
              2 *
              Math.PI
        break
      case 4:
      case 5:
        baseTheta = ((elements[this.atomicNumber].tableColumn - 6) / 18) * 2 * Math.PI
        break
      case 6:
      case 7:
        baseTheta =
          elements[this.atomicNumber].tableColumn <= 2
            ? ((elements[this.atomicNumber].tableColumn - 9.5) / this.getSpiralPeriod()) *
              2 *
              Math.PI
            : ((elements[this.atomicNumber].tableColumn + 4.5) / this.getSpiralPeriod()) *
              2 *
              Math.PI
        break
      case 9:
      case 10:
        baseTheta =
          ((elements[this.atomicNumber].tableColumn - 9.5) / this.getSpiralPeriod()) * 2 * Math.PI

        break
      default:
        baseTheta = elements[this.atomicNumber].tableColumn - 1
    }
    let adjustedTheta = baseTheta //- Math.PI * 4.1 / 8
    return adjustedTheta
  }
  thetaUp(): number {
    return this.thetaDown()
  }
  z(): number {
    const { tableRow, tableColumn } = elements[this.atomicNumber]

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
}
export default CurledPosition
