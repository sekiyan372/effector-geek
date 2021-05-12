import { FC } from 'react'

type Props = {
  onClick: VoidFunction
}

const AddButton: FC<Props> = ({ onClick, children }) => (
  <button
    type="button"
    className="border border-green-500 bg-green-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-green-600 focus:outline-none focus:shadow-outline"
    onClick={ onClick }
  >
    { children }
  </button>
)

export default AddButton
