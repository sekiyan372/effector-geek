import { NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'
import { useForm, useFieldArray } from 'react-hook-form'
import React, { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import Head from '~/components/Head'
import Heading from '~/components/Heading'
import Label from '~/components/Label'
import LinkIndex from '~/components/LinkIndex'
import AddButton from '~/components/Button/AddButton'
import DeleteButton from '~/components/Button/DeleteButton'
import SuccessButton from '~/components/Button/SuccessButton'
import { firestore, storage } from '~/utils/firebase'
import { getEffectors } from '~/store'

const NO_IMAGE = require('../../../public/noimage.jpg')

type FormValues = {
  image: File[],
  artist: string,
  band: string,
  description: string,
  effectorIds: {id: string}[]
}

const NewBoard: NextPage = () => {
  const router = useRouter()
  const [preview, setPreview] = useState<string>(NO_IMAGE)
  const effectors = useSelector(getEffectors)

  const { register ,handleSubmit, formState: { errors }, setError, control } = useForm<FormValues>({
    defaultValues: {
      image: null,
      artist: '',
      band: '',
      description: '',
      effectorIds: [{id: ''}],
    }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "effectorIds",
  })

  const submitArticle = useCallback(async (value: FormValues) => {
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

  const handleChangeFile = (event) => {
    const { files } = event.target

    if(files[0].size > 10485760) {
      setError('image', {
        type: 'manual',
        message: '10MB以下のファイルをアップロードしてください',
      })
      return
    }

    setPreview(URL.createObjectURL(files[0]))
  }

  return(
    <>
      <Head title="エフェクターボード投稿" />
      <section>
        <div className="m-12">
          <LinkIndex />
          <Heading>エフェクターボード投稿</Heading>

          <form onSubmit={ handleSubmit(submitArticle) }>
            <div className="mb-5">
              <Label htmlFor="image">エフェクターボード</Label>
              <input
                type="file"
                id="image"
                {...register('image', { required: true })}
                onChange={ handleChangeFile }
              />
              {errors.image && (
                <div role="alert" className="text-sm text-red-500">
                  入力してください
                </div>
              )}
              <img src={ preview } alt="プレビュー画像" className="mb-5" />
            </div>

            <div className="mb-5">
              <Label htmlFor="artist">アーティスト (30文字以内)</Label>
              <input
                type="text"
                className="p-3 border h-10 w-full"
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
              <input
                type="text"
                className="p-3 border h-10 w-full"
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
              {errors.band && errors.band.type === 'maxLength' && (
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
                      <span className="w-1 mt-4 mr-2">{ index + 1 }</span>
                      <select
                        id="effecotr"
                        className="m-2 border h-10 w-11/12"
                        name={`effectorIds[${index}].effectorId`}
                        {...register(`effectorIds.${index}.id` as const, { required: true })}
                      >
                        <option value={undefined}>未選択</option>
                        {effectors?.map((effector) => (
                          <option key={ effector.id } value={ effector.id }>
                            { effector.brand } { effector.name }
                          </option>
                        ))}
                      </select>
                      {fields.length > 1 && (
                        <DeleteButton onClick={() => remove(index)}>削除</DeleteButton>
                      )}
                    </div>
                    {errors[`effectorIds.${index}.id`] && errors[`effectorIds.${index}.id`].type === 'required' && (
                      <div role="alert" className="text-sm text-red-500">
                        入力してください
                      </div>
                    )}
                  </div>
                )
              })}
              <AddButton onClick={() => append({})}>追加</AddButton>
            </div>

            <SuccessButton>投稿</SuccessButton>
          </form>
        </div>
      </section>
    </>
  )
}

export default NewBoard
