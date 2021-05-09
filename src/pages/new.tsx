import { NextPage } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/dist/client/router'
import { useForm } from 'react-hook-form'
import React, { useCallback, useState } from 'react'
import Head from '~/components/Head'
import Heading from '~/components/Heading'
import Label from '~/components/Label'
import LinkIndex from '~/components/LinkIndex'
import SuccessButton from '~/components/SuccessButton'
import TextField from '~/components/TextField'
import { firestore, storage } from '~/utils/firebase'

type FormValues = {
  image: File,
  artist: string,
  band: string,
}

const New: NextPage = () => {
  const router = useRouter()
  const [preview, setPreview] = useState<string>('/src/static/noimage.jpg')

  const { register ,handleSubmit, control, formState: { errors }, setError } = useForm<FormValues>({
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
    setPreview(URL.createObjectURL(files[0]))
  }

  return(
    <>
      <Head title="エフェクターボード投稿" />
      <section>
        <div className="m-12">
          <LinkIndex />
          <Heading>新規投稿</Heading>
          <form onSubmit={ handleSubmit(submitArticle) }>
            <div className="mb-5">
              <Label htmlFor="image">エフェクターボード</Label>
              <input
                type="file"
                className=""
                id="image"
                {...register('image')}
                onChange={ handleChangeFile }
              />
              <Image src={ preview } alt="プレビュー画像" height={300} width={500} className="mb-5" />
            </div>
            <div>
              <Label htmlFor="artist">アーティスト</Label>
              <TextField
                id="artist"
                {...register('artist')}
              />
            </div>
            <div>
              <Label htmlFor="band">バンド名</Label>
              <TextField
                id="band"
                {...register('band')}
              />
            </div>
            <SuccessButton>投稿</SuccessButton>
          </form>
        </div>
      </section>
    </>
  )
}

export default New
