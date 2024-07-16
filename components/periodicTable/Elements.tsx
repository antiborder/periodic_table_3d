import React from "react"
import Element from "./Element"
import elements from "../../constants/elements"

type ElementsProps = {
  selectedAtomicNumber: number
  shapesCount: number
  characteristic: number
  shapeCount: number
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
            characteristic={props.characteristic}
            selectedAtomicNumber={props.selectedAtomicNumber}
            shapeCount={props.shapeCount}
            setAtomicNumber={props.setAtomicNumber}
            setIsModalVisible={props.setIsModalVisible}
          />
        )
      })}
    </>
  )
}
export default Elements
