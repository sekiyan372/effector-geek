import { VFC } from 'react'
import Link from 'next/link'

const Header: VFC = () => {
  return (
    <header className="bg-green-500 p-5">
      <span className="text-3xl text-white">
        <Link href='/'>Effector Geek</Link>
      </span>
      <span className="float-right">
        <Link href='/boards/new'>
          <button className="border border-gray-200 bg-gray-200 text-gray-700 rounded-md px-4 py-2 mb-2 transition duration-500 ease select-none hover:bg-gray-300 focus:outline-none focus:shadow-outline">
            ボード投稿
          </button>
        </Link>
      </span>
    </header>
  )
}

export default Header
