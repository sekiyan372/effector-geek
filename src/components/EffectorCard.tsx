import dayjs from 'dayjs'
import { VFC } from 'react'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import { getEffectorById } from '~/store'
import { Effector } from '~/types'

const NO_IMAGE = require('../../public/noimage.jpg')

type Props = {
  effectorId: Effector['id']
}

const EffectorCard: VFC<Props> = (props) => {
  const effector = useSelector(getEffectorById(props.effectorId))

  return (
    <Link href={`/effectors/${effector.id}`}>
      <div className="p-2 m-2 w-56 border-2 border-solid border-green-500 rounded cursor-pointer hover:bg-gray-200 focus:outline-none focus:shadow-outline">
        <img
          className="m-auto w-1/2"
          src={ effector.imageUrl ? effector.imageUrl : NO_IMAGE }
          alt={ effector.imageUrl ? `${ effector.name }のイメージ` : 'no image' }
        />
        <div className="m-3 border-b border-green-500">
          <div className="mb-2 overflow-hidden">
            <span className="font-bold">{ effector.brand }</span>
            <span className="px-1 border rounded-sm border-yellow-300 bg-yellow-300 float-right">{ effector.type }</span>
          </div>
          <p className="text-center">{ effector.name }</p>
        </div>
        <div>
          { dayjs(effector.createdAt).format('YYYY/MM/DD HH:mm') } 登録
        </div>
      </div>
    </Link>
  )
}

export default EffectorCard
