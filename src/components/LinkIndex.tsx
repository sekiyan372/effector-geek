import { FC } from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

const LinkIndex: FC = () => (
  <Link href="/">
    <div className="mb-8 cursor-pointer">
      <FontAwesomeIcon icon={ faChevronLeft } size="lg" />
      <a className="ml-3 text-xl">一覧へ</a>
    </div>
  </Link>
)

export default LinkIndex
