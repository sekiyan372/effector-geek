import { useEffect } from 'react'
import { NextPage, GetStaticProps } from 'next'
import { useDispatch, useSelector } from 'react-redux'
import EffectorCard from '~/components/EffectorCard'
import Head from '~/components/Head'
import Heading from '~/components/Heading'
import { actions, getEffectorIds } from '~/store'
import { effectorConverter } from '~/utils/converter'
import { env } from '~/utils/env'
import { firestore } from '~/utils/firebase'
import { Effector } from '~/types'

type Props = {
  effectors?: Effector[]
  errorCode?: number
}

const IndexEffector: NextPage<Props> = (props) => {
  const dispatch = useDispatch()
  const effectorIds = useSelector(getEffectorIds)

  useEffect(() => {
    dispatch(actions.updateEffectors(props.effectors))
  }, [])

  return (
    <>
      <Head title="エフェクター一覧" />
      <section>
        <div className="m-12">
          <Heading>エフェクター一覧</Heading>
          <ul className="m-3 flex flex-wrap">
            {effectorIds.map((effectorId) => (
                <li key={ effectorId }>
                  <EffectorCard effectorId={ effectorId } />
                </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const effectors =
    await firestore()
      .collection("effectors")
      .orderBy('createdAt', 'desc')
      .withConverter(effectorConverter)
      .get()
      .then(({ docs }) => {
        const effectors = docs.map((doc) => doc.data())
        return effectors
      })

  return {
    props: { effectors: effectors },
    revalidate: env.IS_DEV ? 30 : 1,
  }
}

export default IndexEffector
