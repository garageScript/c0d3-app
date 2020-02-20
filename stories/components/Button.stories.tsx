import * as React from 'react'
import Button from '../../components/Button'
import '../../scss/index.scss'

export default {
  component: Button,
  title: 'Components/Button'
}

export const ColorWithText: React.FC = () => (
  <Button text="Click Me" btnType="btn-primary" />
)
export const BorderWithText: React.FC = () => <Button text="Click Me" />
export const ColorBadgeButton: React.FC = () => (
  <Button text="Song" initial="SZ" />
)
