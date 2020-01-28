import * as React from 'react'
import { storiesOf } from '@storybook/react'
import Button from '../components/Button'
<<<<<<< HEAD
import '../styles/tailwind.css'
=======
// import ColorButton from '../components/ColorButton'
>>>>>>> nav

storiesOf('Button', module)
  .add('with text', () => {
    return <Button style="light">Click Me</Button>
  })
  .add('with color', () => {
    return <Button style="dark">Click Me</Button>
  })
