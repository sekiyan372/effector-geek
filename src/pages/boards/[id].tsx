import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Error from 'next/error'
import Heading from '~/components/Heading'
import Head from '~/components/Head'
import LinkIndex from '~/components/LinkIndex'
import { articleConverter } from '~/utils/converter'
import { env } from '~/utils/env'
import { firestore } from '~/utils/firebase'
import { Article } from '~/types'

type Props = {
  article?: Article
  errorCode?: number
}

const Page: NextPage<Props> = (props) => {
  if (props.errorCode) return <Error statusCode={ props.errorCode } />

  return (
    <>
      <Head title={`${ props.article.artist }のエフェクターボード`} />
      <section className="m-12">
        <LinkIndex />
        <Heading>
          { props.article.artist }
          <span className="ml-8">from { props.article.band }</span>
        </Heading>
        <div className="p-2 m-2">
          <img
            className="w-full"
            src={ props.article.imageUrl }
            alt={`${ props.article.artist }のエフェクターボード`}
          />
        </div>
      </section>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: 'blocking',
})

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const id = context.params.id

  if (typeof id !== 'string') {
    return {
      props: { errorCode: 404 },
      revalidate: env.IS_DEV ? 30 : 1,
    }
  }

  const doc = await firestore().collection('articles').doc(id).withConverter(articleConverter).get()

  return {
    props: { article: doc.data() },
    revalidate: env.IS_DEV ? 30 : 1,
  }
}

export default Page
