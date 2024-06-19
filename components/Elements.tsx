import React from "react"
import Element from "./Element"
import elements from "../constants/elements"

type ElementsProps = {
  selectedAtomicNumber: number
  numberOfShapes: number
  shapesCount: number
  numberOfCharacteristics: number
  CharacteristicCount: number
  count: number
  setIsModalVisible: (isModalVisible: boolean) => void
  setAtomicNumber: (atomicNumber: number) => void
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
            numberOfShapes={props.numberOfShapes}
            selectedAtomicNumber={props.selectedAtomicNumber}
            count={props.count}
            setAtomicNumber={props.setAtomicNumber}
            setIsModalVisible={props.setIsModalVisible}
          />
        )
      })}
    </>
  )
}
export default Elements
