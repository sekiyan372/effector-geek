import { FC } from 'react'

const SuccessButton: FC = ({ children }) => (
  <div className="m-10 text-center">
    <button type="submit" className="border bg-green-500 w-60 h-10 text-white">
      {children}
    </button>
  </div>
)

export default SuccessButton
