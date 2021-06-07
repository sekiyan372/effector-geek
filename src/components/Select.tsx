import { forwardRef ,ForwardRefRenderFunction, SelectHTMLAttributes } from 'react'
import ClassNames from 'classnames'

type Props = SelectHTMLAttributes<HTMLSelectElement>

const Select: ForwardRefRenderFunction<HTMLSelectElement, Props> = (
  { children, className, ...props }, ref
) => (
  <select
    ref={ref}
    className={ClassNames(
      "m-2 border px-4 py-2",
      className
    )}
    {...props}
  >
    {children}
  </select>
)

export default forwardRef(Select)
