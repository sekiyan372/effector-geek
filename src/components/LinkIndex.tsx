import { FC } from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

type Props = {
  href: string
  text: string
}

const LinkIndex: FC<Props> = (props) => (
  <Link href={ props.href }>
    <div className="mb-8 cursor-pointer">
      <FontAwesomeIcon icon={ faChevronLeft } size="lg" />
      <a className="ml-3 text-xl">{ props.text }</a>
    </div>
  </Link>
)

export default LinkIndex
