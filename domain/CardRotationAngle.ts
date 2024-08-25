import TablePosition from "../domain/TablePosition"
import CurledPosition from "../domain/CurledPosition"
import DiscPosition from "../domain/DiscPosition"
import ElementouchPosition from "../domain/ElementouchPosition"
import OrbitalPosition from "../domain/OrbitalPosition"

import { shapeData } from "../constants/shapes"
import { Num3 } from "../utils/coordinateFuncs"

const rotationOffset = (Math.PI * 1.1) / 2

class CardRotationAngle {
  private atomicNumber: number

  constructor(atomicNumber: number) {
    this.atomicNumber = atomicNumber
  }

  angle(t: number): Num3 {
    t = t % Object.keys(shapeData).length

    const tablePosition = new TablePosition(this.atomicNumber)
    const curledPosition = new CurledPosition(this.atomicNumber)
    const discPosition = new DiscPosition(this.atomicNumber)
    const elementouchPosition = new ElementouchPosition(this.atomicNumber)
    const orbitalPosition = new OrbitalPosition(this.atomicNumber)

    switch (true) {
      case t >= 0 && t <= 1:
        const baseTheta =
          tablePosition.theta() + t * (curledPosition.thetaDown() - tablePosition.theta())
        return [0, 0, this.revalueTheta(baseTheta + rotationOffset) * t]

      case t > 1 && t <= 2:
        const baseTheta2 =
          curledPosition.thetaUp() + (t - 1) * (discPosition.theta() - curledPosition.thetaUp())
        return [0, 0, baseTheta2 + rotationOffset]

      case t > 2 && t <= 3:
        const baseTheta3 =
          discPosition.theta() +
          Math.pow(t - 2, 1 / 2) * (elementouchPosition.thetaDown() - discPosition.theta())
        return [0, 0, baseTheta3 + rotationOffset]

      case t > 3 && t <= 4:
        const revaluedTheta3 = elementouchPosition.thetaUp() + rotationOffset
        return [
          0,
          0,
          revaluedTheta3 + (t - 3) * (this.revaluedTheta4(orbitalPosition) - revaluedTheta3),
        ]
      default:
        return [0, 0, 0]
    }
  }

  revalueTheta = (theta: number): number => {
    return Math.PI < theta ? theta - 2 * Math.PI : theta
  }

  revaluedTheta4 = (orbitalPosition): number => {
    const angle = -orbitalPosition.winding() * 2 * Math.PI
    return angle
  }
}
export default CardRotationAngle
