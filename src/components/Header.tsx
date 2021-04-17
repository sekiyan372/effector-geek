import { VFC } from 'react'
import Link from 'next/link'

const Header: VFC = () => {
  return (
    <header className="bg-green-500 p-5">
      <span className="text-3xl">
        <Link href='/'>プロボー(仮)</Link>
      </span>
      <span className="float-right">
        <Link href='/new'>新規投稿</Link>
      </span>
    </header>
  )
}

export default Header
