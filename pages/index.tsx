import { GetStaticProps } from "next"
import Head from "next/head"
import Layout, { siteTitle } from "./components/layout"
import utilStyles from "../styles/utils.module.css"
import Link from "next/link"
import Date from "./components/date"
import { getSortedPostsData } from "../lib/posts"
import Structure from "../components/Structure"

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
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Structure
      // count={count}
      // characteristicCount={characteristicCount}
      // numberOfCharacteristics={numberOfCharacteristics}
      // selectedAtomicNumber={atomicNumber}
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
