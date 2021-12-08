import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Error from 'next/error'
import EffectorCard from '~/components/EffectorCard'
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

const ShowBoard: NextPage<Props> = (props) => {
  const effectorIds = props.article.effectorIds.map((value: { id: string }) => value.id)

  if (props.errorCode) return <Error statusCode={ props.errorCode } />

  return (
    <>
      <Head title={`${ props.article.artist }のエフェクターボード`} />
      <section className="m-12">
        <LinkIndex href="/boards" />
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
          <div className="mt-14">
            <h3 className="mb-5 text-xl font-bold text-green-500">説明</h3>
            <p className="m-3 text-lg">{ props.article.description }</p>
          </div>
          <div className="mt-14">
            <h3 className="mb-5 text-xl font-bold text-green-500">エフェクター情報</h3>
            <ul className="m-3 flex flex-wrap">
              {effectorIds.map((effectorId) => (
                <li key={ effectorId }>
                  <EffectorCard effectorId={ effectorId } />
                </li>
              ))}
            </ul>
          </div>
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

export default ShowBoard
