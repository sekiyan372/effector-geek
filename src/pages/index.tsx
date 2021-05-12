import { NextPage } from 'next'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ArticleCard from '~/components/ArticleCard'
import EffectorCard from '~/components/EffectorCard'
import Head from '~/components/Head'
import Heading from '~/components/Heading'
import { actions, getArticleIds, getEffectorIds } from '~/store'
import { articleConverter, effectorConverter } from '~/utils/converter'
import { firestore } from '~/utils/firebase'

const Index: NextPage = () => {
  const dispatch = useDispatch()
  const articleIds = useSelector(getArticleIds)
  const effectorIds = useSelector(getEffectorIds)

  useEffect(() => {
    firestore()
      .collection("articles")
      .orderBy('createdAt', 'desc')
      .withConverter(articleConverter)
      .get()
      .then(({ docs, query }) => {
        const articles = docs.map((doc) => doc.data())
        dispatch(actions.updateArticles(articles))
      })

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
      <Head title="トップページ" />
      <section>
        <div className="m-12">
          <Heading>エフェクターボード一覧</Heading>
          <ul className="m-3 flex flex-wrap">
            {articleIds.map((articleId) => (
              <li key={ articleId }>
                <ArticleCard articleId={ articleId } />
              </li>
            ))}
          </ul>
        </div>

        <div className="m-12">
          <Heading>登録エフェクター一覧</Heading>
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

export default Index
