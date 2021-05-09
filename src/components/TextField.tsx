import { FC } from 'react'

type Props = {
  id: string
}

const TextField: FC<Props> = ({ id }) => (
  <input
    type="text"
    className="mb-5 border h-10 w-4/5"
    id={ id }
  />
)

export default TextField
