import { GetStaticProps } from "next"
import Head from "next/head"
import Layout, { siteTitle } from "./components/layout"
import utilStyles from "../styles/utils.module.css"
import Link from "next/link"
import Date from "./components/date"
import { getSortedPostsData } from "../lib/posts"
import Structure from "../components/Structure"
import SymbolPanel from "../components/SymbolPanel"
import { useState } from "react"
import CharacteristicPanel from "../components/CharacteristicPanel"
import ElementDetailModal from "../components/ElementDetailModal"
import ShapePanel from "../components/ShapePanel"
import ColorGauge from "../components/ColorGauge"

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
        ? "Spiral"
        : count % numberOfShapes === 2
          ? "Disc"
          : count % numberOfShapes === 3
            ? "Elementouch"
            : "Block"

  const characteristic =
    characteristicCount % numberOfCharacteristics === 0
      ? "Block"
      : characteristicCount % numberOfCharacteristics === 1
        ? "沸点"
        : characteristicCount % numberOfCharacteristics === 2
          ? "融点"
          : characteristicCount % numberOfCharacteristics === 3
            ? "イオン化エネルギー"
            : "電子親和力"

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
      {/* <Head>
        <title>{siteTitle}</title>
      </Head> */}

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

      <ColorGauge />

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
