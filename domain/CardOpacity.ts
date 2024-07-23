import elements from "../constants/elements"
import { characteristicValues } from "../constants/characteristics"

class CardOpacity {
  private static readonly DEFAULT_OPACITY: number = 0.7
  private characteristic: number
  private atomicNumber: number

  constructor(characteristic: number, atomicNumber: number) {
    this.characteristic = characteristic
    this.atomicNumber = atomicNumber
  }

  getOpacity(): number {
    let opacity: number

    switch (this.characteristic) {
      case characteristicValues["ORBITAL"]:
        opacity = CardOpacity.DEFAULT_OPACITY
        break
      case characteristicValues["BOILING_POINT"]:
        opacity =
          elements[this.atomicNumber]["boilingPoint"] === null ? 0 : CardOpacity.DEFAULT_OPACITY
        break
      case characteristicValues["MELTING_POINT"]:
        opacity =
          elements[this.atomicNumber]["meltingPoint"] === null ? 0 : CardOpacity.DEFAULT_OPACITY
        break
      case characteristicValues["IONIZATION_ENERGY"]:
        opacity =
          elements[this.atomicNumber]["1stIonizationEnergy"] === null
            ? 0
            : CardOpacity.DEFAULT_OPACITY
        break
      case characteristicValues["ELECTRON_AFFINITY"]:
        opacity =
          elements[this.atomicNumber]["electronAffinity"] === null ? 0 : CardOpacity.DEFAULT_OPACITY
        break
      default:
        opacity = CardOpacity.DEFAULT_OPACITY
    }

    return opacity
  }
}
export default CardOpacity
