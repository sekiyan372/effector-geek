import { NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'
import { useForm } from 'react-hook-form'
import React, { useCallback } from 'react'
import Head from '~/components/Head'
import { firestore } from '~/utils/firebase'
import { Article } from '~/types'

type SubmitValues = {
  artist: Article['artist']
  band?: Article['band']
}

const New: NextPage = () => {
  const router = useRouter()

  const { register ,handleSubmit, formState: { errors }, setError } = useForm<SubmitValues>({
    defaultValues: {
      artist: '',
      band: '',
    }
  })

  const submitArticle = useCallback(
    async (value: SubmitValues) => {
      await firestore().collection('articles').add({
        artist: value.artist,
        band: value.band,
      })
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
