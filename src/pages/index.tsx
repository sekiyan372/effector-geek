import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NextPage } from 'next'
import Link from 'next/link'
import ArticleCard from '~/components/ArticleCard'
import EffectorCard from '~/components/EffectorCard'
import Head from '~/components/Head'
import Heading from '~/components/Heading'
import { actions, getArticleIds, getEffectorIds } from '~/store'
import { articleConverter, effectorConverter } from '~/utils/converter'
import { firestore } from '~/utils/firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

const ARTICLES_PER_FETCH: number = 6
const EFFECTORS_PER_FETCH: number = 8

const Index: NextPage = () => {
  const dispatch = useDispatch()
  const articleIds = useSelector(getArticleIds)
  const effectorIds = useSelector(getEffectorIds)

  useEffect(() => {
    firestore()
      .collection("articles")
      .orderBy('createdAt', 'desc')
      .limit(ARTICLES_PER_FETCH)
      .withConverter(articleConverter)
      .get()
      .then(({ docs, query }) => {
        const articles = docs.map((doc) => doc.data())
        dispatch(actions.updateArticles(articles))
      })

    firestore()
      .collection("effectors")
      .orderBy('createdAt', 'desc')
      .limit(EFFECTORS_PER_FETCH)
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
          <Heading>
            <span className="">新着エフェクターボード</span>
            <span className="float-right text-base text-blue-500">
              <Link href="/boards/index">もっとみる</Link>
              <span className="mx-1" />
              <FontAwesomeIcon icon={ faChevronRight } />
            </span>
          </Heading>
          <ul className="m-3 flex flex-wrap">
            {articleIds.map((articleId) => (
              <li key={ articleId }>
                <ArticleCard articleId={ articleId } />
              </li>
            ))}
          </ul>
        </div>

        <div className="m-12">
          <Heading>
            <span>新着登録エフェクター</span>
            <span className="float-right text-base text-blue-500">
              <Link href="/effectors/index">もっとみる</Link>
              <span className="mx-1" />
              <FontAwesomeIcon icon={ faChevronRight } />
            </span>
          </Heading>
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
