import Layout, { siteTitle } from "./components/layout"
import Head from "next/head"
import Structure from "../components/Structure"
import SymbolPanel from "../components/controlPanel/SymbolPanel"
import { useState } from "react"
import CharacteristicPanel from "../components/controlPanel/CharacteristicPanel"
import ElementDetailModal from "../components/modal/ElementDetailModal"
import ShapePanel from "../components/controlPanel/ShapePanel"
import ColorGauge from "../components/controlPanel/ColorGauge"
import { characteristicValues } from "../constants/characteristics"
import { characteristicData } from "../constants/characteristics"
import { shapeValues } from "../constants/shapes"
import { shapeData } from "../constants/shapes"
import elements from "../constants/elements"
import { modulo } from "../utils/util"
import BondMode, { BondPhase } from "../components/bond/BondMode"
import { BondType } from "../domain/bond"

const Home = (): React.ReactNode => {
  const [atomicNumber, setAtomicNumber] = useState(1)
  const [shapeCount, setShapeCount] = useState(1000)
  const [characteristic, setCharacteristic] = useState<characteristicValues>(
    characteristicValues.ORBITAL
  )
  const [isModalVisible, setIsModalVisible] = useState(false)

  // ---- bond mode (くっつき方) ----
  const [bondA, setBondA] = useState<number | null>(null)
  const [bondB, setBondB] = useState<number | null>(null)
  const [bondPhase, setBondPhase] = useState<BondPhase>("pick")
  const [bondGuess, setBondGuess] = useState<BondType | null>(null)

  const enterBond = (a: number) => {
    setBondA(a)
    setBondB(null)
    setBondGuess(null)
    setBondPhase("pick")
    setIsModalVisible(false)
  }
  const exitBond = () => {
    setBondA(null)
    setBondB(null)
    setBondGuess(null)
    setBondPhase("pick")
  }
  const handleBondPick = (z: number) => {
    if (bondA === null || bondPhase !== "pick") return
    setBondB(z)
    setBondPhase("predict")
  }
  const handleBondGuess = (t: BondType) => {
    setBondGuess(t)
    setBondPhase("result")
  }
  const resetBond = () => {
    setBondB(null)
    setBondGuess(null)
    setBondPhase("pick")
  }

  const shape = shapeValues[modulo(shapeCount, Object.keys(shapeData).length)]

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

      {bondA === null && (
        <>
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
        </>
      )}

      <Structure
        shapeCount={shapeCount}
        characteristic={characteristic}
        selectedAtomicNumber={atomicNumber}
        setAtomicNumber={setAtomicNumber}
        setIsModalVisible={setIsModalVisible}
        bondActive={bondA !== null && bondPhase === "pick"}
        onBondPick={handleBondPick}
        onBondEnter={enterBond}
      />

      {isModalVisible === true && bondA === null && (
        <ElementDetailModal
          setIsModalVisible={setIsModalVisible}
          atomicNumber={atomicNumber}
          onBondStart={enterBond}
        />
      )}

      {bondA !== null && (
        <BondMode
          a={bondA}
          b={bondB}
          phase={bondPhase}
          guessed={bondGuess}
          onGuess={handleBondGuess}
          onReset={resetBond}
          onExit={exitBond}
        />
      )}
    </Layout>
  )
}
export default Home
