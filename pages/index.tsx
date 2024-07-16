import Layout, { siteTitle } from "./components/layout"
import Head from "next/head"
import Structure from "../components/Structure"
import SymbolPanel from "../components/controlPanel/SymbolPanel"
import { useState } from "react"
import CharacteristicPanel from "../components/controlPanel/CharacteristicPanel"
import ElementDetailModal from "../components/modal/ElementDetailModal"
import ShapePanel from "../components/controlPanel/ShapePanel"
import ColorGauge from "../components/controlPanel/ColorGauge"
import {characteristicValues} from "../constants/characteristics"
import {characteristicData} from "../constants/characteristics"
import {shapeValues} from "../constants/shapes"
import {shapeData} from "../constants/shapes"
import elements from "../constants/elements"
import { modulo } from "../utils/util"

const Home = (): React.ReactNode => {

  const [atomicNumber, setAtomicNumber] = useState(1)
  const [shapeCount, setShapeCount] = useState(1000)
  const [characteristic, setCharacteristic] = useState<characteristicValues>(characteristicValues.ORBITAL)
  const [isModalVisible, setIsModalVisible] = useState(false)

  const shape = shapeValues[modulo(shapeCount , Object.keys(shapeData).length)]

  const handleShapeNumberUp = () => {
    setShapeCount(shapeCount + 1)
  }
  const handleShapeNumberDown = () => {
    setShapeCount(shapeCount - 1)
  }

  const handleAtomicNumberUp = () => {
    setAtomicNumber((prev) => {
      return modulo(prev, Object.keys(elements).length) + 1
    })
  }
  const handleAtomicNumberDown = () => {
    setAtomicNumber((prev) => {
      return modulo(prev - 2, Object.keys(elements).length) + 1 // 2減らして1増やすのは0になった時への配慮
    })
  }

  const handleCharacteristicUp = () => {
    setCharacteristic(modulo(characteristic + 1, Object.keys(characteristicData).length))
  }
  const handleCharacteristicDown = () => {
    setCharacteristic(modulo(characteristic - 1, Object.keys(characteristicData).length))
  }

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <SymbolPanel
        atomicNumber={atomicNumber}
        onAtomicNumberUp={handleAtomicNumberUp}
        onAtomicNumberDown={handleAtomicNumberDown}
      />

      <ShapePanel
        shape={shape}
        onShapeUp={handleShapeNumberUp}
        onShapeDown={handleShapeNumberDown}
      />

      <CharacteristicPanel
        characteristic={characteristic}
        onCharacteristicUp={handleCharacteristicUp}
        onCharacteristicDown={handleCharacteristicDown}
      />

      <ColorGauge characteristic={characteristic} />

      <Structure
        shapeCount={shapeCount}
        characteristic={characteristic}
        selectedAtomicNumber={atomicNumber}
        setAtomicNumber={setAtomicNumber}
        setIsModalVisible={setIsModalVisible}
      />

      {isModalVisible === true && (
        <ElementDetailModal setIsModalVisible={setIsModalVisible} atomicNumber={atomicNumber} />
      )}
    </Layout>
  )
}
export default Home