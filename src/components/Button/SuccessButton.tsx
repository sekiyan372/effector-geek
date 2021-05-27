import { FC, ButtonHTMLAttributes } from 'react'
import ClassNames from 'classnames'

type Props = ButtonHTMLAttributes<HTMLButtonElement>

const SuccessButton: FC<Props> = ({ children, className }) => (
  <div className="text-center">
    <button
      type="submit"
      className={ClassNames(
        "border border-green-500 bg-green-500 px-4 py-2 m-2 text-white hover:bg-green-600 focus:outline-none focus:shadow-outline",
        className
      )}
    >
      {children}
    </button>
  </div>
)

export default SuccessButton
