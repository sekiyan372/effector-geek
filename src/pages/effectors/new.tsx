import { NextPage } from 'next'
import Head from '~/components/Head'
import Heading from '~/components/Heading'
import LinkIndex from '~/components/LinkIndex'

const NewEffector: NextPage = () => {
  return(
    <>
      <Head title="エフェクター登録" />
      <section className="m-12">
        <LinkIndex />
        <Heading>エフェクター登録</Heading>
      </section>
    </>
  )
}

export default NewEffector
