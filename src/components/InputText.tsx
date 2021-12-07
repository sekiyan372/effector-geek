import { forwardRef ,ForwardRefRenderFunction, InputHTMLAttributes } from 'react'
import ClassNames from 'classnames'

type Props = InputHTMLAttributes<HTMLInputElement>

const InputText: ForwardRefRenderFunction<HTMLInputElement ,Props> = (
  {className, ...props}, ref
) => (
  <input
    ref={ref}
    type="text"
    className={ClassNames(
      'p-3 border h-10 w-full',
      className
    )}
    {...props}
  />
)

export default forwardRef(InputText)
