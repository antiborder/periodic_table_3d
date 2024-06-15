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
  const [count, setCount] = useState(1000)//(windowSize.width>800 ? 1000 : 1003)

  function modulo(a, n) {
    return ((a % n) + n) % n;
  }

  const handleAtomicNumberUp = () => {
    setAtomicNumber(modulo(atomicNumber,numberOfElements)+1)
  }

  const handleAtomicNumberDown = () => {
    setAtomicNumber(modulo(atomicNumber-2,numberOfElements)+1
      )
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

      <Structure
      count={count}
      // characteristicCount={characteristicCount}
      // numberOfCharacteristics={numberOfCharacteristics}
      selectedAtomicNumber={atomicNumber}
      // numberOfShapes={numberOfShapes}
      // atmicNumber = {atomicNumber}
      // setAtomicNumber = {setAtomicNumber}
      // setIsModalVisible = {setIsModalVisible}
      // modulo = {modulo}
      />
    </Layout>
  )
}
export default Home
