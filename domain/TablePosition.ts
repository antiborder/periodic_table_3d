import elements from '../constants/elements'
import {cartesianToCylindrical} from '../funcs/coordinateFuncs'

type Num3 = [number, number, number]

class TablePosition {

  private atomicNumber: number

  constructor(atomicNumber: number) {
    this.atomicNumber = atomicNumber
  }

  public getTablePosition = (): Num3 => {
    return this.translateTablePosition(this.getTableBasePosition())
  }

  private getTableBasePosition (): Num3  {
    return [elements[this.atomicNumber].tableColumn, 0, -elements[this.atomicNumber].tableRow]
  }

  private translateTablePosition  (position: Num3): Num3  {
    return [position[0] - 13, position[1] - 6, position[2]]
  }

  public radius (): number {
    return cartesianToCylindrical(this.getTablePosition())[0]
  }

  public theta (): number {
    return cartesianToCylindrical(this.getTablePosition())[1]
  }

  public z (): number {
    return cartesianToCylindrical(this.getTablePosition())[2]
  }

}
export default TablePosition