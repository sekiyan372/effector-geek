import { FC } from 'react'
import Link from 'next/link'

type Props = {
  href: string
}

const LinkButton: FC<Props> = ({ href, children }) => (
  <Link href={ href }>
    <button className="ml-3 border border-gray-200 bg-gray-200 text-gray-700 rounded-md px-4 py-2 mb-2 transition duration-500 ease select-none hover:bg-gray-300 focus:outline-none focus:shadow-outline">
      { children }
    </button>
  </Link>
)

export default LinkButton
