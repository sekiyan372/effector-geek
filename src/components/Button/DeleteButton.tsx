import { FC } from 'react'

type Props = {
  onClick: VoidFunction
}

const DeleteButton: FC<Props> = ({ onClick, children }) => (
  <button
    type="button"
    className="border border-red-500 bg-red-500 text-white rounded-md px-2 py-1 m-2 transition duration-500 ease select-none hover:bg-red-600 focus:outline-none focus:shadow-outline whitespace-nowrap"
    onClick={ onClick }
  >
    { children }
  </button>
)

export default DeleteButton
