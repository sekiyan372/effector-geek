import { NextPage } from 'next'
import Link from 'next/link'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ArticleCard from '~/components/ArticleCard'
import EffectorCard from '~/components/EffectorCard'
import Head from '~/components/Head'
import Heading from '~/components/Heading'
import { actions, getArticleIds, getEffectorIds, getEffectors } from '~/store'
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
      .then(({ docs }) => {
        const articles = docs.map((doc) => doc.data())
        dispatch(actions.updateArticles(articles))
      })

    firestore()
      .collection("effectors")
      .orderBy('createdAt', 'desc')
      .withConverter(effectorConverter)
      .get()
      .then(({ docs}) => {
        const effectors = docs.map((doc) => doc.data())
        dispatch(actions.updateEffectors(effectors))
      })
  }, [])

  return (
    <>
      <Head title="トップページ" />
      <section>
        <div className="m-6 md:m-12">
          <Heading>
            <span>新着エフェクターボード</span>
            <span className="sm:float-right block text-right text-base text-blue-500">
              <Link href="/boards">もっとみる</Link>
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
            {articleIds.length === 0 && (
              <div>エフェクターボードはありません。</div>
            )}
          </ul>
        </div>

        <div className="m-6 md:m-12">
          <Heading>
            <span>新着登録エフェクター</span>
            <span className="sm:float-right block text-right text-base text-blue-500">
              <Link href="/effectors">もっとみる</Link>
              <span className="mx-1" />
              <FontAwesomeIcon icon={ faChevronRight } />
            </span>
          </Heading>
          <ul className="m-3 flex flex-wrap">
            {effectorIds.map((effectorId, index) => {
              if(index < EFFECTORS_PER_FETCH) {
                return(
                <li key={ effectorId }>
                  <EffectorCard effectorId={ effectorId } />
                </li>
                )
              }
            })}
          </ul>
        </div>
      </section>
    </>
  )
}

export default Index
