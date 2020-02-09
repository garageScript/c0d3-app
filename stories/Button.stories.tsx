import * as React from 'react'
import { storiesOf } from '@storybook/react'
import Button from '../components/Button'
import '../scss/index.scss'

storiesOf('Button', module)
  .add('color with text', () => {
    return <Button text="Click Me" color="primary" />
  })
  .add('border with text', () => {
    return <Button text="Click Me" color="secondary" />
  })
  .add('color badge button', () => {
    return <Button text="Song" initial="SZ" color="secondary" />
  })
