import { NextPage } from 'next'
import Head from '~/components/Head'
import Heading from '~/components/Heading'
import LinkIndex from '~/components/LinkIndex'

const NewEffector: NextPage = () => {
  return(
    <>
      <Head title="エフェクター投稿" />
      <section>
        <LinkIndex />
        <Heading>エフェクターボード投稿</Heading>
      </section>
    </>
  )
}

export default NewEffector
