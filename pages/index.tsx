import { GetStaticProps } from "next"
import Layout, { siteTitle } from "./components/layout"
import { getSortedPostsData } from "../lib/posts"
import Head from "next/head"
import Structure from "../components/Structure"
import SymbolPanel from "../components/controlPanel/SymbolPanel"
import { useState } from "react"
import CharacteristicPanel from "../components/controlPanel/CharacteristicPanel"
import ElementDetailModal from "../components/modal/ElementDetailModal"
import ShapePanel from "../components/controlPanel/ShapePanel"
import ColorGauge from "../components/controlPanel/ColorGauge"
import {characteristicValues} from "../constants/characteristics"
import { modulo } from "../utils/util"

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData,
    },
  }
}

const Home = (): React.ReactNode => {
  const numberOfShapes = 5
  const numberOfCharacteristics = 5
  const numberOfElements = 118

  const [atomicNumber, setAtomicNumber] = useState(1)
  const [count, setCount] = useState(1000) //(windowSize.width>800 ? 1000 : 1003)
  const [characteristic, setCharacteristic] = useState<characteristicValues>(characteristicValues.ORBITAL)
  const [isModalVisible, setIsModalVisible] = useState(false)


  const shape =
    count % numberOfShapes === 0
      ? "Standard"
      : count % numberOfShapes === 1
        ? "Curled"
        : count % numberOfShapes === 2
          ? "Disc"
          : count % numberOfShapes === 3
            ? "Elementouch"
            : "Block"

  const handleShapeNumberUp = () => {
    setCount(count + 1)
  }
  const handleShapeNumberDown = () => {
    setCount(count - 1)
  }

  const handleAtomicNumberUp = () => {
    setAtomicNumber((prev) => {
      return modulo(prev, numberOfElements) + 1
    })
  }

  const handleAtomicNumberDown = () => {
    setAtomicNumber((prev) => {
      return modulo(prev - 2, numberOfElements) + 1 // 2減らして1増やすのは0になった時への配慮
    })
  }

  const handleCharacteristicUp = () => {
    setCharacteristic(modulo(characteristic + 1, numberOfCharacteristics))
  }
  const handleCharacteristicDown = () => {
    setCharacteristic(modulo(characteristic - 1, numberOfCharacteristics))
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
        count={count}
        characteristic={characteristic}
        numberOfCharacteristics={numberOfCharacteristics}
        selectedAtomicNumber={atomicNumber}
        numberOfShapes={numberOfShapes}
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
