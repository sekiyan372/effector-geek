import { NextPage } from 'next'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ArticleCard from '~/components/ArticleCard'
import Head from '~/components/Head'
import Heading from '~/components/Heading'
import { actions, getArticleIds } from '~/store'
import { articleConverter } from '~/utils/converter'
import { firestore } from '~/utils/firebase'

const IndexBoard: NextPage = () => {
  const dispatch = useDispatch()
  const articleIds = useSelector(getArticleIds)

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
  }, [])

  return (
    <>
      <Head title="エフェクターボード一覧" />
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
      </section>
    </>
  )
}

export default IndexBoard
