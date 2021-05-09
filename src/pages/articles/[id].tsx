import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Error from 'next/error'
import { articleConverter } from '~/utils/converter'
import { firestore } from '~/utils/firebase'
import { Article } from '~/types'
import Head from '~/components/Head'
import Link from 'next/link'

type Props = {
  article?: Article
  errorCode?: number
}

const Page: NextPage<Props> = (props) => {
  if (props.errorCode) return <Error statusCode={ props.errorCode } />

  return (
    <>
      <Head title="エフェクターボード" />
      <section className="m-12">
        <div>
          { props.article.artist } from { props.article.band }
        </div>
        <div className="p-2 m-2">
          <img src={ props.article.imageUrl } alt={`${ props.article.artist }のエフェクターボード`} />
        </div>
        <Link href="/">
          <button className="border">戻る</button>
        </Link>
      </section>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: true,
})

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const id = context.params.id

  if (typeof id !== 'string') {
    return {
      props: { errorCode: 404 },
      revalidate: 1,
    }
  }

  const doc = await firestore().collection('articles').doc(id).withConverter(articleConverter).get()

  return {
    props: { article: doc.data() },
    revalidate: 1,
  }
}

export default Page
