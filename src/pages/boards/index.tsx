import { useEffect } from 'react'
import { NextPage, GetStaticProps } from 'next'
import { useDispatch, useSelector } from 'react-redux'
import ArticleCard from '~/components/ArticleCard'
import Head from '~/components/Head'
import Heading from '~/components/Heading'
import { actions, getArticleIds } from '~/store'
import { articleConverter } from '~/utils/converter'
import { env } from '~/utils/env'
import { firestore } from '~/utils/firebase'
import { Article } from '~/types'

type Props = {
  articles?: Article[]
  errorCode?: number
}

const IndexBoard: NextPage<Props> = (props) => {
  const dispatch = useDispatch()
  const articleIds = useSelector(getArticleIds)

  useEffect(() => {
    dispatch(actions.updateArticles(props.articles))
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

export const getStaticProps: GetStaticProps<Props> = async () => {
  const articles =
    await firestore()
      .collection("articles")
      .orderBy('createdAt', 'desc')
      .withConverter(articleConverter)
      .get()
      .then(({ docs }) => {
        const articles = docs.map((doc) => doc.data())
        return articles
      })

  return {
    props: { articles: articles },
    revalidate: env.IS_DEV ? 30 : 1,
  }
}

export default IndexBoard
