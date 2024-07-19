import elements from "../constants/elements";

class Opacity {

    private static readonly DEFAULT_OPACITY: number = 0.7;
    private characteristic: number;
    private atomicNumber: number;

    constructor(characteristic: number, atomicNumber: number) {
        this.characteristic = characteristic;
        this.atomicNumber = atomicNumber;
    }

    getOpacity(): number {
        let opacity: number;

        switch (this.characteristic) {
        case 0:
            opacity = Opacity.DEFAULT_OPACITY;
            break;
        case 1:
            opacity = elements[this.atomicNumber]["boilingPoint"] === null ? 0 : Opacity.DEFAULT_OPACITY;
            break;
        case 2:
            opacity = elements[this.atomicNumber]["meltingPoint"] === null ? 0 : Opacity.DEFAULT_OPACITY;
            break;
        case 3:
            opacity = elements[this.atomicNumber]["1stIonizationEnergy"] === null ? 0 : Opacity.DEFAULT_OPACITY;
            break;
        case 4:
            opacity = elements[this.atomicNumber]["electronAffinity"] === null ? 0 : Opacity.DEFAULT_OPACITY;
            break;
        default:
            opacity = Opacity.DEFAULT_OPACITY;
        }

        return opacity;
    }
}
export default Opacity;