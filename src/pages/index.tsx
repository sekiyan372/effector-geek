import { NextPage } from 'next'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actions, getArticles } from '~/store'
import { articleConverter } from '~/utils/converter'
import { firestore } from '~/utils/firebase'
import ArticleCard from '~/components/ArticleCard'

const Index: NextPage = () => {
  const dispatch = useDispatch()
  const articles = useSelector(getArticles)

  useEffect(() => {
    firestore()
      .collection("articles")
      .withConverter(articleConverter)
      .get()
      .then(({docs, query}) => {
        const articles = docs.map((doc) => doc.data())
        console.log(articles[0].createdAt)
        dispatch(actions.updateArticles(articles))
      })
  }, [])

  return (
    <div className="m-12">
      <h1>新着ボード</h1>
      <ul>
        {articles.map((article) => (
          <li key={article}>
            <ArticleCard articleId={article} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Index
