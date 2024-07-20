import elements from "../constants/elements";
import convert from "color-convert"
import {characteristicValues} from "../constants/characteristics";

class CardColor {

    private characteristic: number;
    private atomicNumber: number;

    constructor(characteristic: number, atomicNumber: number) {
        this.characteristic = characteristic;
        this.atomicNumber = atomicNumber;
    }

    public getColor ():string {
        switch (this.characteristic) {
            case characteristicValues["ORBITAL"]:
                return this.getOrbitalColor();
            case characteristicValues["BOILING_POINT"]:
                return this.getBoilingPointColor();
            case characteristicValues["MELTING_POINT"]:
                return this.getMeltingPointColor();
            case characteristicValues["IONIZATION_ENERGY"]:
                return this.getIonizationEnergyColor();
            case characteristicValues["ELECTRON_AFFINITY"]:
                return this.getElectronAffinityColor();
            default:
                return "#FFFFFF";
        }
    }

    private getOrbitalColor ():string {
        const color =
        elements[this.atomicNumber].orbit.slice(-1) === "s"
            ? "#FF777A"
            : elements[this.atomicNumber].orbit.slice(-1) === "p"
                ? "#FFBC20"
                : elements[this.atomicNumber].orbit.slice(-1) === "d"
                ? "#67BCEE"
                : "#6ADE68"
        return color
    }

    private getBoilingPointColor ():string {
        const max = 5930
        const min = -273
        const weight = -(elements[this.atomicNumber]["boilingPoint"] - min) / (max - min) + 1

        const h = Math.pow(weight, 1.5) * 180 + 0
        const s = 100
        const v = 100
        const color = "#" + convert.hsv.hex(h, s, v)
        return color
    }
    private getMeltingPointColor ():string {
        const max = 5930
        const min = -273
        const weight = -(elements[this.atomicNumber]["meltingPoint"] - min) / (max - min) + 1
        const h = Math.pow(weight, 1.5) * 180 + 0
        const s = 100
        const v = 100
        const color = "#" + convert.hsv.hex(h, s, v)
        return color
    }
    private getIonizationEnergyColor ():string {
        const max = 2372
        const min = 370
        const weight = -(elements[this.atomicNumber]["1stIonizationEnergy"] - min) / (max - min) + 1
        const h = Math.pow(weight, 2) * 120 + 240
        const s = Math.pow(weight, 4) * 100
        const v = Math.pow(weight, 2) * 100
        const color = "#" + convert.hsv.hex(h, s, v)
        return color
    }
    private getElectronAffinityColor ():string {
        const max = 349
        const min = -116
        const weight = (elements[this.atomicNumber]["electronAffinity"] - min) / (max - min)
        const h = -Math.pow(weight, 1) * 120 + 330
        const s = Math.pow(weight, 0.4) * 100
        const v = Math.pow(weight, 0.6) * 100
        const color = "#" + convert.hsv.hex(h, s, v)
        return color
    }
}
export default CardColor;