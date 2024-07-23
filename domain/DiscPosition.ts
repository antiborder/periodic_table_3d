import elements from "../constants/elements"

class DiscPosition {
  private atomicNumber: number

  constructor(atomicNumber: number) {
    this.atomicNumber = atomicNumber
  }

  public radius(): number {
    if (elements[this.atomicNumber]["tableRow"] <= 7) {
      return (
        elements[this.atomicNumber]["tableRow"] +
        2 +
        elements[this.atomicNumber]["tableColumn"] / 18
      )
    } else {
      return (
        elements[this.atomicNumber]["tableRow"] -
        1 +
        elements[this.atomicNumber]["tableColumn"] / 32
      )
    }
  }
  public theta(): number {
    return elements[this.atomicNumber]["tableRow"] <= 7
      ? elements[this.atomicNumber]["tableColumn"] <= 2
        ? (elements[this.atomicNumber]["tableColumn"] / 32) * 2 * Math.PI - (Math.PI * 3) / 4
        : ((elements[this.atomicNumber]["tableColumn"] + 14) / 32) * 2 * Math.PI - (Math.PI * 3) / 4
      : (elements[this.atomicNumber]["tableColumn"] / 32) * 2 * Math.PI - (Math.PI * 3) / 4
  }
  public z(): number {
    const z = -12
    return z
  }
}
export default DiscPosition
