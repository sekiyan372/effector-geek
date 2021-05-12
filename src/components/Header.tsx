import { VFC } from 'react'
import Link from 'next/link'
import LinkButton from '~/components/Button/LinkButton'

const Header: VFC = () => {
  return (
    <header className="bg-green-500 p-5">
      <span className="text-3xl text-white">
        <Link href='/'>Effector Geek</Link>
      </span>
      <span className="ml-20 text-white">
        <Link href='/about'>Effector Geekとは？</Link>
      </span>
      <span className="float-right">
        <LinkButton href='/boards/new'>ボード投稿</LinkButton>
        <LinkButton href='/effectors/new'>エフェクター登録</LinkButton>
      </span>
    </header>
  )
}

export default Header
