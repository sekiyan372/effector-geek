import { useEffect } from 'react'
import { NextPage, GetStaticProps } from 'next'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import SuccessButton from '~/components/Button/SuccessButton'
import EffectorCard from '~/components/EffectorCard'
import Head from '~/components/Head'
import Heading from '~/components/Heading'
import Label from '~/components/Label'
import Select from '~/components/Select'
import { actions, getEffectorIds } from '~/store'
import { effectorConverter } from '~/utils/converter'
import { env } from '~/utils/env'
import { firestore } from '~/utils/firebase'
import { Effector } from '~/types'

type Props = {
  effectors?: Effector[]
  errorCode?: number
}

type FormValues = {
  brand?: string
  genre?: string
}

const IndexEffector: NextPage<Props> = (props) => {
  const dispatch = useDispatch()
  const effectorIds = useSelector(getEffectorIds)
  const brands = [...new Set(props.effectors.map((effector) => effector.brand))]
  const genres = [...new Set(props.effectors.map((effector) => effector.type))]

  const { register ,handleSubmit} = useForm<FormValues>({
    defaultValues: {
      brand: null,
      genre: null,
    }
  })

  const SubmitSerch = (value: FormValues) => {
    if (value.genre && value.brand) {
      const serchingbyBoth = props.effectors
        .filter((effector) => effector.type === value.genre && effector.brand === value.brand)
      dispatch(actions.updateEffectors(serchingbyBoth))
      return
    } else if (value.genre && !value.brand) {
      const serchingByGenre = props.effectors
        .filter((effector) => effector.type === value.genre)
      dispatch(actions.updateEffectors(serchingByGenre))
      return
    } else if (!value.genre && value.brand) {
      const serchByBrand = props.effectors
        .filter((effector) => effector.brand === value.brand)
      dispatch(actions.updateEffectors(serchByBrand))
      return
    }
  }

  useEffect(() => {
    dispatch(actions.updateEffectors(props.effectors))
  }, [])

  return (
    <>
      <Head title="エフェクター一覧" />
      <section className="m-6 md:m-12">
        <Label className="text-green-500">エフェクター検索</Label>
        <form onSubmit={ handleSubmit(SubmitSerch) }>
          <Select
            className="py-2 w-full"
            id="genre"
            {...register('genre', { required: false })}
          >
            <option value=''>ジャンルを選択</option>
            {genres.map((genre, index) => (
              <option key={ index } value={ genre }>
                { genre }
              </option>
            ))}
          </Select>

          <Select
            className="py-2 w-full"
            id="brand"
            {...register('brand', { required: false })}
          >
            <option value=''>ブランドを選択</option>
            {brands.map((brand, index) => (
              <option key={ index } value={ brand }>
                { brand }
              </option>
            ))}
          </Select>

          <SuccessButton className="w-60">検索</SuccessButton>
        </form>
      </section>

      <section className="m-6 md:m-12">
        <Heading>エフェクター一覧</Heading>
        <ul className="m-3 flex flex-wrap">
          {effectorIds.map((effectorId) => (
              <li key={ effectorId }>
                <EffectorCard effectorId={ effectorId } />
              </li>
          ))}
        </ul>
      </section>
    </>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
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
    props: { effectors: effectors },
    revalidate: env.IS_DEV ? 30 : 1,
  }
}

export default IndexEffector
