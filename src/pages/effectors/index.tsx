import { NextPage } from 'next'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import EffectorCard from '~/components/EffectorCard'
import Head from '~/components/Head'
import Heading from '~/components/Heading'
import { actions, getEffectorIds } from '~/store'
import { effectorConverter } from '~/utils/converter'
import { firestore } from '~/utils/firebase'

const IndexEffector: NextPage = () => {
  const dispatch = useDispatch()
  const effectorIds = useSelector(getEffectorIds)

  useEffect(() => {
    firestore()
      .collection("effectors")
      .orderBy('createdAt', 'desc')
      .withConverter(effectorConverter)
      .get()
      .then(({ docs, query }) => {
        const effectors = docs.map((doc) => doc.data())
        dispatch(actions.updateEffectors(effectors))
      })
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

export default IndexEffector
