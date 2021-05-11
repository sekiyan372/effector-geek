import { NextPage } from 'next'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ArticleCard from '~/components/ArticleCard'
import Heading from '~/components/Heading'
import { actions, getArticles } from '~/store'
import { articleConverter } from '~/utils/converter'
import { firestore } from '~/utils/firebase'

const Index: NextPage = () => {
  const dispatch = useDispatch()
  const articles = useSelector(getArticles)

  useEffect(() => {
    firestore()
      .collection("articles")
      .withConverter(articleConverter)
      .get()
      .then(({ docs, query }) => {
        const articles = docs.map((doc) => doc.data())
        dispatch(actions.updateArticles(articles))
      })
  }, [])

  return (
    <div className="m-12">
      <Heading>エフェクターボード一覧</Heading>
      <ul className="p-1 flex flex-wrap">
        {articles.map((article) => (
          <li key={ article }>
            <ArticleCard articleId={ article } />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Index
