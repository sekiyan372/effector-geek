import { FC } from 'react'

const Heading: FC = ({ children }) => (
  <h2 className="mb-5 text-3xl font-bold border-b border-gray-300">
    {children}
  </h2>
)

export default Heading
