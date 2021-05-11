import { NextPage } from 'next'
import Head from '~/components/Head'
import Heading from '~/components/Heading'
import LinkIndex from '~/components/LinkIndex'

const ShowEffector: NextPage = () => {
  return(
    <>
      <Head title="エフェクター" />
      <section>
        <LinkIndex />
        <Heading>エフェクター</Heading>
      </section>
    </>
  )
}

export default ShowEffector
