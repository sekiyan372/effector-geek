import { NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'
import { useForm } from 'react-hook-form'
import React, { useCallback, useState } from 'react'
import Head from '~/components/Head'
import Heading from '~/components/Heading'
import InputFile from '~/components/InputFile'
import InputText from '~/components/InputText'
import Label from '~/components/Label'
import LinkIndex from '~/components/LinkIndex'
import Select from '~/components/Select'
import SuccessButton from '~/components/Button/SuccessButton'
import { firestore, storage } from '~/utils/firebase'

const NO_IMAGE = require('../../../public/noimage.jpg')

type FormValues = {
  image: File[],
  name: string,
  brand: string,
  type: string,
}

const NewEffector: NextPage = () => {
  const router = useRouter()
  const [preview, setPreview] = useState<string>(NO_IMAGE)

  const { register ,handleSubmit, formState: { errors }, setError } = useForm<FormValues>({
    defaultValues: {
      image: null,
      name: '',
      brand: '',
      type: null,
    }
  })

  const submitArticle = useCallback(async (value: FormValues) => {
    let imageUrl = ''
    if(value.image[0]) {
      // 画像をfirebase storageへ保存
      const imagePath = `effector/${value.image[0].name}`
      await storage().ref().child(imagePath).put(value.image[0])
      // 保存した画像のURLを取得
      imageUrl = await storage().ref().child(imagePath).getDownloadURL()
    }
    // データをfirestoreへ保存
    await firestore().collection('effectors').add({
      imageUrl: imageUrl,
      name: value.name,
      brand: value.brand,
      type: value.type,
      createdAt: firestore.FieldValue.serverTimestamp(),
    })
    // トップページへ移動
    router.push('/')
  }, [])

  const handleChangeFile = (event) => {
    const { files } = event.target

    // ファイル選択でキャンセルを押した時
    if (files.length === 0) {
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

    if(files[0].size > 1048576) {
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
      <Head title="エフェクター登録" />
      <section className="m-12">
        <LinkIndex />
        <Heading>エフェクター登録</Heading>
        <p className="mb-10 text-red-400">* がついた項目は必須項目です。</p>

        <form onSubmit={ handleSubmit(submitArticle) }>
          <div className="mb-10">
            <Label htmlFor="image">エフェクター画像</Label>
            <InputFile
              id="image"
              {...register('image')}
              onChange={ handleChangeFile }
            />
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
            <Label htmlFor="brand">ブランド名 (30文字以内) *</Label>
            <InputText
              id="brand"
              {...register('brand', {
                required: true,
                maxLength: 30,
              })}
            />
            {errors.brand && errors.brand.type === 'required' && (
              <div role="alert" className="text-sm text-red-500">
                入力してください
              </div>
            )}
            {errors.brand && errors.brand.type === 'maxLength' && (
              <div role="alert" className="text-sm text-red-500">
                30文字以内で入力してください
              </div>
            )}
          </div>

          <div className="mb-5">
            <Label htmlFor="name">エフェクター名 (50文字以内) *</Label>
            <InputText
              id="name"
              {...register('name', {
                required: true,
                maxLength: 50,
              })}
            />
            {errors.name && errors.name.type === 'required' && (
              <div role="alert" className="text-sm text-red-500">
                入力してください
              </div>
            )}
            {errors.name && errors.name.type === 'maxLength' && (
              <div role="alert" className="text-sm text-red-500">
                50文字以内で入力してください
              </div>
            )}
          </div>

          <div className="mb-5">
            <Label htmlFor="type">種類 *</Label>
            <Select
              className="py-4 w-full"
              id="type"
              {...register('type', { required: true })}
            >
              <option value="OverDrive">Over Drive</option>
              <option value="Distortion">Distortion</option>
              <option value="Fuzz">Fuzz</option>
              <option value="Booster">Booster</option>
              <option value="PreAmp">Pre Amp</option>
              <option value="Chorus">Chorus</option>
              <option value="Flanger">Flanger</option>
              <option value="Phaser">Phaser</option>
              <option value="Tremolo">Tremolo</option>
              <option value="Reverb">Reverb</option>
              <option value="Delay">Delay</option>
              <option value="Looper">Looper</option>
              <option value="Compressor">Compressor</option>
              <option value="Limiter">Limiter</option>
              <option value="Wah">Wah</option>
              <option value="Octaver">Octaver</option>
              <option value="PitchShifter">Pitch Shifter</option>
              <option value="Equalizer">Equalizer</option>
              <option value="LineSelector">Line Selector</option>
              <option value="Tuner">Tuner</option>
              <option value="Switcher">Switcher</option>
              <option value="PowerSupply">Power Supply</option>
              <option value="Cable">Cable</option>
              <option value="other">その他</option>
            </Select>
            {errors.type && errors.type.type === 'required' && (
              <div role="alert" className="text-sm text-red-500">
                選択してください
              </div>
            )}
          </div>

          <SuccessButton className="w-60">投稿</SuccessButton>
        </form>
      </section>
    </>
  )
}

export default NewEffector
