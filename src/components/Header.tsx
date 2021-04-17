import { VFC } from 'react'
import Link from 'next/link'

const Header: VFC = () => {
  return (
    <header>
      <Link href='/'>プロボー(仮)</Link>
      <Link href='/new'>新規投稿</Link>
    </header>
  )
}

export default Header
