import { NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'
import { useForm } from 'react-hook-form'
import React, { useCallback } from 'react'
import Head from '~/components/Head'
import { firestore, storage } from '~/utils/firebase'

type FormValues = {
  image: File,
  artist: string,
  band: string,
}

const New: NextPage = () => {
  const router = useRouter()

  const { register ,handleSubmit, formState: { errors }, setError } = useForm<FormValues>({
    defaultValues: {
      image: null,
      artist: '',
      band: '',
    }
  })

  // const submitArticle = (value: SubmitValues) => {
  //   console.log(value)
  // }
  const submitArticle = useCallback(async (value: FormValues) => {
    const imageUrl = `effector_board/${value.image[0].name}`
    // フォームのデータを firestore へ保存
    await firestore().collection('articles').add({
      imageUrl: imageUrl,
      artist: value.artist,
      band: value.band,
      createdAt: firestore.FieldValue.serverTimestamp(),
    })
    // 画像を firebase storage へ保存
    await storage().ref().child(imageUrl).put(value.image)
    // トップページへ移動
    router.push('/')
  }, [])

  return(
    <>
      <Head title="エフェクターボード投稿" />
      <section>
        <div className="m-12">
          <h2>新規投稿</h2>
          <form onSubmit={ handleSubmit(submitArticle) }>
            <div>
              <label htmlFor="image">エフェクターボード</label>
              <input
                type="file"
                className=""
                id="image"
                {...register('image')}
              />
            </div>
            <div>
              <label htmlFor="artist">アーティスト</label>
              <input
                type="text"
                className="border h-5"
                id="artist"
                {...register('artist')}
              />
            </div>
            <div>
              <label htmlFor="band">バンド名</label>
              <input
                type="text"
                className="border h-5"
                id="band"
                {...register('band')}
              />
            </div>
            <button type="submit" className="border">投稿</button>
          </form>
        </div>
      </section>
    </>
  )
}

export default New
