import { FC } from 'react'

const SuccessButton: FC = ({ children }) => (
  <div className="m-10 text-center">
    <button type="submit" className="border border-green-500 bg-green-500 px-4 py-2 m-2 w-60 text-white hover:bg-green-600 focus:outline-none focus:shadow-outline">
      {children}
    </button>
  </div>
)

export default SuccessButton
