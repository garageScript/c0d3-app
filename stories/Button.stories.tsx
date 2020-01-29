import * as React from 'react'
import { storiesOf } from '@storybook/react'
import Button from '../components/NavButton'
import '../styles/tailwind.css'

storiesOf('Button', module)
  .add('with text', () => {
    return <Button style="light">Click Me</Button>
  })
  .add('with color', () => {
    return <Button style="dark">Click Me</Button>
  })
