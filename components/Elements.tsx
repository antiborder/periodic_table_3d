import React from "react"
import Element from "./Element"
import elements from "../constants/elements"

type ElementsProps = {
  selectedAtomicNumber: number
  numberOfCharacteristics: number
  CharacteristicCount: number
  count: number
}
const Elements = (props: ElementsProps): React.ReactNode => {
  return (
    <>
      {[...Array(118)].map((_, i) => {
        return (
          <Element
            key={i}
            atomicNumber={elements[(i + 1).toString()].atomicNumber}
            numberOfCharacteristics={props.numberOfCharacteristics}
            characteristicCount={props.CharacteristicCount}
            numberOfShapes={5}
            shapesCount={0}
            selectedAtomicNumber={props.selectedAtomicNumber}
            count={1000}
            // emissive={new THREE.Color('#000000')}
            // count={props.count}
          />
        )
      })}
    </>
  )
}
export default Elements
