import elements from '../constants/elements'
import {getOrbitalPositionX} from '../funcs/coordinateFuncs'

type Num3 = [number, number, number]

const ELEMENTOUCH_RADIUS_P = 2.0
const ELEMENTOUCH_RADIUS_D = 2.4
const ELEMENTOUCH_RADIUS_F = 3.6

class ElementouchPosition {

    private atomicNumber: number

    constructor(atomicNumber: number) {
      this.atomicNumber = atomicNumber
    }

radius  (): number  {
  let radius = 0
  switch (elements[this.atomicNumber]["spiralRow"]) {
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

thetaDown  () :number {
  let baseTheta = elements[this.atomicNumber].spiralColumn - (1 % this.getElementouchPeriod())
  let adjustedTheta =
    (baseTheta / this.getElementouchPeriod()) * 2 * Math.PI -
    (Math.PI * 4.1) / 8 +
    Math.PI -
    2 * Math.PI * elements[this.atomicNumber]["winding"]
  return adjustedTheta
}


thetaUp ():number  {
  let winding = 0
  switch (elements[this.atomicNumber]["orbit"].slice(-1)) {
    case "s":
      winding = -1
      break
    case "p":
      winding = getOrbitalPositionX(this.atomicNumber) === 0 ? -2 : -1
      break
    case "d":
      winding = getOrbitalPositionX(this.atomicNumber) === 0 ? -2 : -1
      break
    case "f":
      winding = getOrbitalPositionX(this.atomicNumber) === 0 ? -2 : -1
      break
    default:
  }

  let baseTheta = elements[this.atomicNumber].spiralColumn - (1 % this.getElementouchPeriod())
  let adjustedTheta =
    (baseTheta / this.getElementouchPeriod()) * 2 * Math.PI -
    (Math.PI * 4.1) / 8 +
    Math.PI +
    2 * Math.PI * winding
  return adjustedTheta
}

z ():number {
  return -elements[this.atomicNumber].spiralRow -
  elements[this.atomicNumber].spiralColumn / this.getElementouchPeriod()
}

  getElementouchPeriod  (): number  {
    let period = 0
    switch (elements[this.atomicNumber]["spiralRow"]) {
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

}
export default ElementouchPosition