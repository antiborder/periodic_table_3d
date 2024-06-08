import { getAllPostIds, getPostData } from "../../lib/posts"
import Date from "../components/date"
import Layout from "../components/layout"
import Head from "next/head"
import utilStyles from "../../styles/utils.module.css"
import { GetStaticProps, GetStaticPaths } from "next"

type Params = {
  params: {
    id: string
  }
}

const getStaticProps: GetStaticProps = async ({ params }: Params) => {
  const postData = await getPostData(params.id)
  return {
    props: {
      postData,
    },
  }
}
export { getStaticProps }

type PostData = {
  title: string
  date: string
  contentHtml: string
}

type PostProps = {
  postData: PostData
}

const Post = ({ postData }: PostProps): React.ReactNode => {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}
export default Post

const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false,
  }
}
export { getStaticPaths }
