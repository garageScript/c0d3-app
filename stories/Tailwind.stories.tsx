import * as React from 'react'
import { storiesOf } from '@storybook/react'
import '../styles/tailwind.css'

storiesOf('Tailwind', module).add('with text', () => {
  return (
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Button
    </button>
  )
})
