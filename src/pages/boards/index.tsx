import { useEffect, useState, useMemo } from 'react'
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
  effectorId?: string
  brand?: string
  genre?: string
}

const IndexBoard: NextPage<Props> = (props) => {
  const dispatch = useDispatch()
  const articleIds = useSelector(getArticleIds)
  const effectors = useSelector(getEffectors)
  const brands = [...new Set(effectors.map((effector) => effector.brand))]
  const genres = [...new Set(effectors.map((effector) => effector.type))]
  const [genre, setGenre] = useState<string>('')
  const [brand, setBrand] = useState<string>('')
  
  const { register ,handleSubmit} = useForm<FormValues>({
    defaultValues: {
      effectorId: null,
      brand: null,
      genre: null,
    }
  })

  const effectorOption: Effector[] = useMemo(() => {
    if (genre !== '' && brand !== '') {
      return effectors.filter((effector) => effector.type === genre && effector.brand === brand)
    } else if (genre !== '' && brand === '') {
      return effectors.filter((effector) => effector.type === genre)
    } else if (brand !== '' && genre === '') {
      return effectors.filter((effector) => effector.brand === brand)
    }
    return effectors
  }, [genre, brand])

  const serchArticles = (searchedEffectors: string[]): Article[] => {
    return props.articles.filter((article) =>
      article.effectorIds.some((effectorId) => searchedEffectors.includes(effectorId.id))
    )
  }

  const SubmitSerch = (value: FormValues) => {
    if(value.effectorId) {
      const searchingArticles = props.articles.filter((article) =>
        article.effectorIds.some((effectorId) => effectorId.id === value.effectorId)
      )
      dispatch(actions.updateArticles(searchingArticles))
      return
    }

    if (value.genre && value.brand) {
      const serchingbyBoth = effectors
        .filter((effector) => effector.type === value.genre && effector.brand === value.brand)
        .map((effector) => effector.id)
      dispatch(actions.updateArticles(serchArticles(serchingbyBoth)))
      return
    } else if (value.genre && !value.brand) {
      const serchingByGenre = effectors
        .filter((effector) => effector.type === value.genre)
        .map((effector) => effector.id)
      dispatch(actions.updateArticles(serchArticles(serchingByGenre)))
      return
    } else if (!value.genre && value.brand) {
      const serchByBrand = effectors
        .filter((effector) => effector.brand === value.brand)
        .map((effector) => effector.id)
      dispatch(actions.updateArticles(serchArticles(serchByBrand)))
      return
    }
  }

  useEffect(() => {
    dispatch(actions.updateArticles(props.articles))
    dispatch(actions.updateEffectors(props.effectors))
  }, [])

  return (
    <>
      <Head title="エフェクターボード一覧" />
      <section>
        <div className="mt-12 mx-12">
          <Label className="text-green-500">エフェクターボード検索</Label>
          <form onSubmit={ handleSubmit(SubmitSerch) }>
            <div className="flex">
              <Select
                className="py-2 w-full"
                id="genre"
                {...register('genre', { required: false })}
                onChange={(e) => setGenre(e.target.value)}
              >
                <option value=''>ジャンルを選択</option>
                {genres.map((genre, index) => (
                  <option key={ index } value={ genre }>
                    { genre }
                  </option>
                ))}
              </Select>
            </div>

            <div className="flex">
              <Select
                className="py-2 w-full"
                id="brand"
                {...register('brand', { required: false })}
                onChange={(e) => setBrand(e.target.value)}
              >
                <option value=''>ブランドを選択</option>
                {brands.map((brand, index) => (
                  <option key={ index } value={ brand }>
                    { brand }
                  </option>
                ))}
              </Select>
            </div>

            <div className="flex">
              <Select
                className="py-2 w-full"
                id="effector"
                {...register('effectorId', { required: false })}
              >
                <option value=''>エフェクターを選択</option>
                {effectorOption?.map((effector) => (
                  <option key={ effector.id } value={ effector.id }>
                    { effector.brand } { effector.name }
                  </option>
                ))}
              </Select>
            </div>

            <SuccessButton className="w-15 rounded-md">検索</SuccessButton>
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
      .orderBy('brand', 'asc')
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
