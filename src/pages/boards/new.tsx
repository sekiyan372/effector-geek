import { NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'
import { useForm } from 'react-hook-form'
import React, { useCallback, useState } from 'react'
import Head from '~/components/Head'
import Heading from '~/components/Heading'
import Label from '~/components/Label'
import LinkIndex from '~/components/LinkIndex'
import SuccessButton from '~/components/SuccessButton'
import { firestore, storage } from '~/utils/firebase'

const noImage = require('../../../public/noimage.jpg')

type FormValues = {
  image: File[],
  artist: string,
  band: string,
}

const NewBoard: NextPage = () => {
  const router = useRouter()
  const [preview, setPreview] = useState<string>(noImage)

  const { register ,handleSubmit, formState: { errors }, setError } = useForm<FormValues>({
    defaultValues: {
      image: null,
      artist: '',
      band: '',
    }
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
                className=""
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
                className="border h-10 w-full"
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
                className="mb-5 border h-10 w-full"
                id="band"
                {...register('band', { maxLength: 30 })}
              />
              {errors.band && errors.band.type === 'maxLength' && (
                <div role="alert" className="text-sm text-red-500">
                  30文字以内で入力してください
                </div>
              )}
            </div>

            <SuccessButton>投稿</SuccessButton>
          </form>
        </div>
      </section>
    </>
  )
}

export default NewBoard
