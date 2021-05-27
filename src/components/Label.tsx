import { FC, LabelHTMLAttributes } from 'react'
import ClassNames from 'classnames'

type Props = LabelHTMLAttributes<HTMLLabelElement>

const Label: FC<Props> = ({ children, htmlFor, className }) => (
  <label
    htmlFor={ htmlFor }
    className={ClassNames(
      "font-bold block text-lg",
      className
    )}
  >
    { children }
  </label>
)

export default Label
