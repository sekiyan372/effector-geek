import { FC } from 'react'

const Heading: FC = ({ children }) => (
  <h2 className="mb-5 font-bold border-b border-gray-300 text-3xl text-green-500">
    {children}
  </h2>
)

export default Heading
