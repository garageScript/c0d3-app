import * as React from 'react'
import { storiesOf } from '@storybook/react'
import Button from '../components/Button'
import '../scss/index.scss'

storiesOf('Button', module).add('with text', () => {
  return <Button text="Click Me" />
})
