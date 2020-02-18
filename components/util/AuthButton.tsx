import * as React from 'react'
import Button from '../Button'

type Props = {
  initial: string
  username: string
}

const AuthButton: React.FC<Props> = ({ initial, username }) => (
  <div>
    <Button
      btnType="border btn-secondary overflow-hidden p-2 text-truncate"
      initial={initial}
      text={username ?? ''}
    />
    <Button text="Logout" btnType="border btn-secondary ml-2" />
  </div>
)

export default AuthButton
