import * as React from 'react'
import { storiesOf } from '@storybook/react'

storiesOf('Font', module).add('title', () => {
  return (
    <div>
      <h1>C0D3</h1>
      <style jsx>
        {`
          @import url('https://fonts.googleapis.com/css?family=PT+Mono&display=swap');

          h1 {
            font-family: 'PT Mono', monospace;
            font-size: 36px;
            color: rgb(84, 64, 216);
          }
        `}
      </style>
    </div>
  )
})
