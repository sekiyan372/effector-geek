import NextHead from 'next/head'
import { FC } from 'react'

type Props = {
  title?: string
}

const BASE_TITLE = 'Effector Geek'
const DESCRIPTION = 'エフェクター好きによるエフェクター好きのためのエフェクター情報共有サイトです。'

const Head: FC<Props> = (props) => {
  const title = props.title ? `${props.title} | ${BASE_TITLE}` : BASE_TITLE

  return (
    <NextHead>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={DESCRIPTION} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@sekiyan372" />
      <meta name="twitter:description" content={DESCRIPTION} />
      <meta name="description" content={DESCRIPTION} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </NextHead>
  )
}

export default Head
