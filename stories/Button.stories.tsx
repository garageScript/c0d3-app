import * as React from 'react'
import { storiesOf } from '@storybook/react'
import Button from '../components/Button'
import '../styles/tailwind.css'

storiesOf('Button', module).add('with text', () => {
  return <Button text="Click Me" />
})
