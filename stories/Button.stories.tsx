import * as React from 'react'
import Button from '../components/Button'
import '../scss/index.scss'

export default {
  component: Button,
  title: 'Button'
}

export const colorWithText: React.FC = () => (
  <Button text="Click Me" btnType="primary" />
)
export const borderWithText: React.FC = () => (
  <Button text="Click Me" btnType="secondary" />
)
export const colorBadgeButton: React.FC = () => (
  <Button text="Song" initial="SZ" btnType="secondary" />
)
