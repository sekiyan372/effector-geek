import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Error from 'next/error'
import Head from '~/components/Head'
import Heading from '~/components/Heading'
import LinkIndex from '~/components/LinkIndex'
import { effectorConverter } from '~/utils/converter'
import { env } from '~/utils/env'
import { firestore } from '~/utils/firebase'
import { Effector } from '~/types'

const NO_IMAGE = require('../../../public/noimage.jpg')

type Props = {
  effector?: Effector
  errorCode?: number
}

const ShowEffector: NextPage<Props> = (props) => {
  if (props.errorCode) return <Error statusCode={ props.errorCode } />

  return(
    <>
      <Head title="エフェクター" />
      <section className="m-6 md:m-12">
        <LinkIndex href="/effectors" text="エフェクター一覧へ" />
        <Heading>
          { props.effector.brand }
          <span className="ml-5">{ props.effector.name }</span>
        </Heading>
        <div className="m-2">
          <img
            className="m-auto p-2 max-h-120 max-w-screen-md"
            src={ props.effector.imageUrl ? props.effector.imageUrl : NO_IMAGE }
            alt={ props.effector.imageUrl ? `${ props.effector.name }のイメージ` : 'no image' }
          />
          <p className="m-5 p-3 w-32 border rounded border-yellow-300 bg-yellow-300 font-bold text-center">
            { props.effector.type }
          </p>
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

  const doc = await firestore().collection('effectors').doc(id).withConverter(effectorConverter).get()

  return {
    props: { effector: doc.data() },
    revalidate: env.IS_DEV ? 30 : 1,
  }
}

export default ShowEffector
