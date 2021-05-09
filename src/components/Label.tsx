import { FC } from 'react'

type Props = {
  htmlFor: string
}

const Label: FC<Props> = ({ htmlFor, children }) => (
  <label htmlFor={ htmlFor } className="font-bold block text-lg">
    { children }
  </label>
)

export default Label
