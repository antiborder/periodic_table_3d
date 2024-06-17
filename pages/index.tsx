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

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData,
    },
  }
}

type Props = {
  allPostsData: {
    id: string
    title: string
    date: string
  }[]
}

const Home = ({ allPostsData }: Props): React.ReactNode => {
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
        ? "沸点" //IONIZATION_ENERGY
        : characteristicCount % numberOfCharacteristics === 2
          ? "融点"
          : characteristicCount % numberOfCharacteristics === 3
            ? "イオン化エネルギー"
            : "電子親和力"

  function modulo(a, n) {
    return ((a % n) + n) % n
  }

  const handleShapeNumberUp = () => {
    setCount(count + 1)
  }
  const handleShapeNumberDown = () => {
    setCount(count - 1)
  }

  const handleAtomicNumberUp = () => {
    setAtomicNumber(modulo(atomicNumber, numberOfElements) + 1)
  }

  const handleAtomicNumberDown = () => {
    setAtomicNumber(modulo(atomicNumber - 2, numberOfElements) + 1)
  }

  const handleCharacteristicUp = () => {
    setCharacteristicCount(modulo(characteristicCount, numberOfCharacteristics) + 1)
  }
  const handleCharacteristicDown = () => {
    setCharacteristicCount(modulo(characteristicCount - 2, numberOfCharacteristics) + 1)
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

      <Structure
        count={count}
        characteristicCount={characteristicCount}
        numberOfCharacteristics={numberOfCharacteristics}
        selectedAtomicNumber={atomicNumber}
        numberOfShapes={numberOfShapes}
        // atmicNumber = {atomicNumber}
        setAtomicNumber={setAtomicNumber}
        setIsModalVisible={setIsModalVisible}
        // modulo = {modulo}
      />

      {isModalVisible === true && (
        <ElementDetailModal setIsModalVisible={setIsModalVisible} atomicNumber={atomicNumber} />
      )}
    </Layout>
  )
}
export default Home
