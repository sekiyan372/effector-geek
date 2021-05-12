import { VFC } from 'react'
import Link from 'next/link'
import LinkButton from '~/components/Button/LinkButton'

const Header: VFC = () => {
  return (
    <header className="bg-green-500 p-5 overflow-hidden">
      <span className="text-3xl text-white whitespace-nowrap">
        <Link href='/'>Effector Geek</Link>
      </span>
      <span className="my-3 sm:ml-20 text-white block sm:inline">
        <Link href='/about'>Effector Geekとは？</Link>
      </span>
      <span className="sm:float-right">
        <LinkButton href='/boards/new'>ボード投稿</LinkButton>
        <LinkButton href='/effectors/new'>エフェクター登録</LinkButton>
      </span>
    </header>
  )
}

export default Header
