import TablePosition from "../domain/TablePosition"
import CurledPosition from "../domain/CurledPosition"
import DiscPosition from "../domain/DiscPosition"
import ElementouchPosition from "../domain/ElementouchPosition"

import { shapeData } from "../constants/shapes"
import {Num3} from "../utils/coordinateFuncs"

class CardRotationAngle{
    private atomicNumber: number

    constructor(atomicNumber: number) {
        this.atomicNumber = atomicNumber
    }

    angle  (t: number): Num3  {
    t = t % Object.keys(shapeData).length

    const tablePosition = new TablePosition(this.atomicNumber)
    const curledPosition = new CurledPosition(this.atomicNumber)
    const discPosition = new DiscPosition(this.atomicNumber)
    const elementouchPosition = new ElementouchPosition(this.atomicNumber)

    switch (true) {
        case t >= 0 && t <= 1:
          const baseTheta = tablePosition.theta() + t * (curledPosition.thetaDown() - tablePosition.theta());
          return [0, 0, this.revalueTheta(baseTheta + (Math.PI * 1.1) / 2) * t];
        case t > 1 && t <= 2:
          const baseTheta2 = curledPosition.thetaUp() + (t - 1) * (discPosition.theta() - curledPosition.thetaUp());
          return [0, 0, baseTheta2 + (Math.PI * 1.1) / 2];
        case t > 2 && t <= 3:
          const baseTheta3 =
            discPosition.theta() +
            Math.pow(t - 2, 1 / 2) * (elementouchPosition.thetaDown() - discPosition.theta());
          return [0, 0, baseTheta3 + (Math.PI * 1.1) / 2];
        case t > 3 && t <= 4:
          const revaluedTheta0 = tablePosition.theta();
          return [
            0,
            0,
            this.revalueTheta(
                elementouchPosition.thetaUp() +
                Math.pow(t - 3, 2) * (revaluedTheta0 - elementouchPosition.thetaUp()) +
                (Math.PI * 1.1) / 2
            ) *(4 - t)
          ];
        default:
          return [0, 0, 0];
      }
  }

  revalueTheta = (theta: number): number => {
    return Math.PI < theta ? theta - 2 * Math.PI : theta
  }
}
export default CardRotationAngle