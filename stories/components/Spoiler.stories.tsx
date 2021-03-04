import * as React from 'react'
import Spoiler from '../../components/Spoiler'

export default {
  component: Spoiler,
  title: 'Components/Spoiler'
}

export const Default: React.FC = () => (
  <Spoiler>
    <h1>This should be hidden</h1>
  </Spoiler>
)

export const WithCustomName: React.FC = () => (
  <Spoiler name="Click me!">
    <h1>Surprise!</h1>
  </Spoiler>
)
