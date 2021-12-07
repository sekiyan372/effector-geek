import { forwardRef ,ForwardRefRenderFunction, InputHTMLAttributes } from 'react'
import ClassNames from 'classnames'

type Props = InputHTMLAttributes<HTMLInputElement>

const InputFile: ForwardRefRenderFunction<HTMLInputElement ,Props> = (
  {className, ...props}, ref
) => (
  <input
    ref={ref}
    type="file"
    className={ClassNames(
      'm-5',
      className
    )}
    {...props}
  />
)

export default forwardRef(InputFile)
