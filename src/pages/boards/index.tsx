import { useEffect } from 'react'
import { NextPage, GetStaticProps } from 'next'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import SuccessButton from '~/components/Button/SuccessButton'
import ArticleCard from '~/components/ArticleCard'
import Head from '~/components/Head'
import Heading from '~/components/Heading'
import Label from '~/components/Label'
import Select from '~/components/Select'
import { actions, getArticleIds, getEffectors } from '~/store'
import { articleConverter, effectorConverter } from '~/utils/converter'
import { env } from '~/utils/env'
import { firestore } from '~/utils/firebase'
import { Article, Effector } from '~/types'

type Props = {
  articles?: Article[]
  effectors?: Effector[]
  errorCode?: number
}

type FormValues = {
  effectorId: string
}

const IndexBoard: NextPage<Props> = (props) => {
  const dispatch = useDispatch()
  const articleIds = useSelector(getArticleIds)
  const effectors = useSelector(getEffectors)

  const { register ,handleSubmit, formState: { errors }} = useForm<FormValues>({
    defaultValues: {
      effectorId: null,
    }
  })

  useEffect(() => {
    dispatch(actions.updateArticles(props.articles))
    dispatch(actions.updateEffectors(props.effectors))
  }, [])

  const SubmitSerch = (value: FormValues) => {
    const serchArticles = props.articles.filter((article) =>
      article.effectorIds.some((effectorId) => effectorId.id === value.effectorId)
    )
    dispatch(actions.updateArticles(serchArticles))
  }

  return (
    <>
      <Head title="エフェクターボード一覧" />
      <section>
        <div className="m-12">
          <form onSubmit={ handleSubmit(SubmitSerch) }>
            <Label htmlFor="serch" className="text-green-500">エフェクターで検索</Label>
            <div className="flex">
              <Select
                className="py-2 w-5/6"
                id="serch"
                {...register('effectorId', { required: true })}
              >
                {effectors?.map((effector) => (
                  <option key={ effector.id } value={ effector.id }>
                    { effector.brand } { effector.name }
                  </option>
                ))}
              </Select>
              <SuccessButton className="w-15 rounded-md">検索</SuccessButton>
            </div>
            {errors.effectorId && errors.effectorId.type === 'required' && (
              <div role="alert" className="text-sm text-red-500">
                選択してください
              </div>
            )}
          </form>
        </div>
      </section>

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
    props: {
      articles: articles,
      effectors: effectors,
    },
    revalidate: env.IS_DEV ? 30 : 1,
  }
}

export default IndexBoard
