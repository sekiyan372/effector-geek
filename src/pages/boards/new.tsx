import React, { useCallback, useState, ChangeEvent, useEffect } from 'react'
import { NextPage, GetStaticProps } from 'next'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/dist/client/router'
import { useForm, useFieldArray } from 'react-hook-form'
import Head from '~/components/Head'
import Heading from '~/components/Heading'
import InputFile from '~/components/InputFile'
import InputText from '~/components/InputText'
import Label from '~/components/Label'
import LinkIndex from '~/components/LinkIndex'
import Select from '~/components/Select'
import AddButton from '~/components/Button/AddButton'
import DeleteButton from '~/components/Button/DeleteButton'
import SuccessButton from '~/components/Button/SuccessButton'
import { effectorConverter } from '~/utils/converter'
import { env } from '~/utils/env'
import { firestore, storage } from '~/utils/firebase'
import { actions, getEffectors } from '~/store'
import { Effector } from '~/types'

const NO_IMAGE = require('../../../public/noimage.jpg')

type FormValues = {
  image: File,
  artist: string,
  band: string,
  description: string,
  effectorIds: {id: string}[]
}

type Props = {
  effectors?: Effector[]
  errorCode?: number
}

const NewBoard: NextPage<Props> = (props) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const effectors = useSelector(getEffectors)
  const [preview, setPreview] = useState<string>(NO_IMAGE)
  const [inEffectors, setInEffects] = useState<string[]>([])
  const [isSelected, setIsSelected] = useState<boolean>(true)
  const [isUnique, setIsUnique] = useState<boolean>(true)

  const { register ,handleSubmit, formState: { errors }, setError, control } = useForm<FormValues>({
    defaultValues: {
      image: null,
      artist: '',
      band: '',
      description: '',
      effectorIds: [],
    },
    mode: 'onChange'
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "effectorIds",
  })

  useEffect(() => {
    dispatch(actions.updateEffectors(props.effectors))
  }, [])

  // エフェクターボード画像を選択した時の処理
  const handleChangeFile = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target

    // ファイル選択でキャンセルを押した時
    if (files.length === 0) {
      setError('image', {
        type: 'required',
      })
      setPreview(NO_IMAGE)
      return
    }

    // ファイルで画像以外が選択された時
    if (files[0].type !== 'image/jpeg' && files[0].type !== 'image/png') {
      setError('image', {
        type: 'manual',
        message: 'jpegまたはpng画像を選択してください',
      })
      setPreview(NO_IMAGE)
      return
    }

    // 画像の容量が大きすぎる時
    if(files[0].size >= 1048576) {
      setError('image', {
        type: 'manual',
        message: '1MB以下のファイルをアップロードしてください',
      })
      setPreview(NO_IMAGE)
      return
    }

    setPreview(URL.createObjectURL(files[0]))
  }, [])

  // エフェクター選択の値が変わったら発火
  const handleChangeEffectors = (event: ChangeEvent<HTMLSelectElement>, index: number) => {
    // 選択されているフィールドを保持
    const arrayBefore = inEffectors.slice(0, index)
    const arrayBack = inEffectors.slice(index + 1, inEffectors.length)
    let newEffectors = []
    if (index !== 0) {
      newEffectors = [...arrayBefore, event.target.value, ...arrayBack]
    } else {
      newEffectors = [event.target.value, ...arrayBack]
    }
    setInEffects(newEffectors)

    // 選択されていないフィールドがないか
    const checkSelected = newEffectors.filter((id) => id === '選択してください')
    if (checkSelected.length !== 0) {
      setIsSelected(false)
    } else {
      setIsSelected(true)
    }

    // 重複しているフィールドがないか
    const checkUnique = inEffectors.filter((id) => id === event.target.value)
    if (checkUnique.length !== 0 && event.target.value !== '選択してください') {
      setIsUnique(false)
    } else {
      setIsUnique(true)
    }
  }

  // エフェクター選択のフォームを増やすボタンを押した時の処理
  const handleAppendEffectors = () => {
    if (isSelected && isUnique) {
      append({})
      const newEffectors = [...inEffectors, '選択してください']
      setInEffects(newEffectors)
      setIsSelected(false)
    }
  }

  // エフェクター選択のフォームの削除ボタンを押した時の処理
  const handleDeleteEffectors = (index: number) => {
    const arrayBefore = inEffectors.slice(0, index)
    const arrayBack = inEffectors.slice(index + 1, inEffectors.length)
    let newEffectors = []
    if (index !== 0) {
      newEffectors = [...arrayBefore, ...arrayBack]
    } else {
      newEffectors = arrayBack
    }
    setInEffects(newEffectors)
    remove(index)

    // エフェクター情報がなくなったら選択していない値はなくなる
    if (newEffectors.length === 0) {
      setIsSelected(true)
    }

    // 削除した後の残りのフィールドに重複した値があるかどうかを確認
    for (let i = 0; i < newEffectors.length; i++) {
      for (let j = 0; j < newEffectors.length; j++) {
        if (i !== j) {
          if (newEffectors[i] === newEffectors[j]) {
            setIsUnique(false)
            return
          }
        }
      }
    }
    setIsUnique(true)
  }

  // 投稿ボタンを押した時の処理
  const submitArticle = useCallback(async (value: FormValues) => {
    // エフェクター選択で選択されていない項目がないかのチェック
    if (!(isSelected && isUnique)) {
      return
    }

    // 画像をfirebase storageへ保存
    const imagePath = `effector_board/${value.image[0].name}`
    await storage().ref().child(imagePath).put(value.image[0])

    // 保存した画像のURLを取得
    const imageUrl = await storage().ref().child(imagePath).getDownloadURL()

    // データをfirestoreへ保存
    await firestore().collection('articles').add({
      imageUrl: imageUrl,
      artist: value.artist,
      band: value.band,
      description: value.description,
      effectorIds: value.effectorIds,
      createdAt: firestore.FieldValue.serverTimestamp(),
    })

    // トップページへ移動
    router.push('/')
  }, [])

  return(
    <>
      <Head title="エフェクターボード投稿" />
      <section>
        <div className="m-12">
          <LinkIndex href="/boards" text="エフェクターボード一覧へ" />
          <Heading>エフェクターボード投稿</Heading>
          <p className="mb-10 text-red-400">* がついた項目は必須項目です。</p>

          <form onSubmit={ handleSubmit(submitArticle) }>
            <div className="mb-10">
              <Label htmlFor="image">エフェクターボード画像 *</Label>
              <InputFile
                id="image"
                {...register('image', { required: true })}
                onChange={ handleChangeFile }
              />
              {errors.image && (errors.image as any).type === 'required' && (
                <div role="alert" className="text-sm text-red-500 mb-5">
                  入力してください
                </div>
              )}
              {errors.image && (errors.image as any).type === 'manual' && (
                <div role="alert" className="text-sm text-red-500 mb-5">
                  { (errors.image as any).message }
                </div>
              )}
              <div className="p-5 border-2 border-dashed border-black rounded-3xl">
                <img src={ preview } alt="プレビュー画像" className="mx-auto max-h-96" />
              </div>
            </div>

            <div className="mb-5">
              <Label htmlFor="artist">アーティスト (30文字以内) *</Label>
              <InputText
                id="artist"
                {...register('artist', {
                  required: true,
                  maxLength: 30,
                })}
              />
              {errors.artist && errors.artist.type === 'required' && (
                <div role="alert" className="text-sm text-red-500">
                  入力してください
                </div>
              )}
              {errors.artist && errors.artist.type === 'maxLength' && (
                <div role="alert" className="text-sm text-red-500">
                  30文字以内で入力してください
                </div>
              )}
            </div>

            <div className="mb-5">
              <Label htmlFor="band">バンド名 (30文字以内)</Label>
              <InputText
                id="band"
                {...register('band', { maxLength: 30 })}
              />
              {errors.band && errors.band.type === 'maxLength' && (
                <div role="alert" className="text-sm text-red-500">
                  30文字以内で入力してください
                </div>
              )}
            </div>

            <div className="mb-5">
              <Label htmlFor="description">説明 (500文字以内)</Label>
              <p>こだわりポイントなどがあれば記入してください！</p>
              <textarea
                className="p-3 border h-32 w-full"
                id="description"
                {...register('description', { maxLength: 500 })}
              />
              {errors.description && errors.description.type === 'maxLength' && (
                <div role="alert" className="text-sm text-red-500">
                  500文字以内で入力してください
                </div>
              )}
            </div>

            <div className="mb-5">
              <Label htmlFor="effector">エフェクター情報</Label>
              {fields.map(({ id }, index) => {
                return(
                  <div key={ id }>
                    <div className="flex">
                      <span className="w-1 mt-6 mr-2">{ index + 1 }</span>
                      <Select
                        className="py-4 w-5/6"
                        id="effecotr"
                        {...register(`effectorIds.${index}.id` as const, {required: true})}
                        onChange={(e) => handleChangeEffectors(e, index)}
                        value={inEffectors[index]}
                      >
                        <option value={undefined}>未選択</option>
                        {effectors?.map((effector) => (
                          <option key={ effector.id } value={ effector.id }>
                            { effector.brand } { effector.name }
                          </option>
                        ))}
                      </Select>
                      <DeleteButton onClick={() => handleDeleteEffectors(index)}>削除</DeleteButton>
                    </div>
                  </div>
                )
              })}
              <AddButton onClick={handleAppendEffectors}>追加</AddButton>
              {!isSelected && (
                <div role="alert" className="text-sm text-red-500">
                  選択されていないフィールドがあります
                </div>
              )}
              {!isUnique && (
                <div role="alert" className="text-sm text-red-500">
                  重複するエフェクターが選択されています
                </div>
              )}
            </div>

            <SuccessButton className="w-60">投稿</SuccessButton>
          </form>
        </div>
      </section>
    </>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
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
      effectors: effectors,
    },
    revalidate: env.IS_DEV ? 30 : 1,
  }
}

export default NewBoard
