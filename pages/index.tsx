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
  const [characteristicCount, setCharacteristicCount] = useState(0)
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

  const characteristic =
    characteristicCount % numberOfCharacteristics === 0
      ? "Orbital"
      : characteristicCount % numberOfCharacteristics === 1
        ? "Boiling Point"
        : characteristicCount % numberOfCharacteristics === 2
          ? "Melting Point"
          : characteristicCount % numberOfCharacteristics === 3
            ? "Ionization Energy"
            : "Electron Affinity"

  function modulo(x, n) {
    // 負の数の場合は+5して正の値にする
    if (x < 0) {
      x = (x % n) + n
    }
    return x % n
  }

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
    setCharacteristicCount(modulo(characteristicCount + 1, numberOfCharacteristics))
  }
  const handleCharacteristicDown = () => {
    setCharacteristicCount(modulo(characteristicCount - 1, numberOfCharacteristics))
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
        characteristicCount={characteristicCount}
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
