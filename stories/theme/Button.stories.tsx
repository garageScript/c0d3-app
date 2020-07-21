import * as React from 'react'

import { Button } from '../../components/theme/Button'

export default {
  component: Button,
  title: 'Theme/Button'
}

export const Basic: React.FC = () => <Button>Basic Button</Button>

export const ColoredButton: React.FC = () => (
  <>
    <Button color="white">Colored Button</Button>
    <Button color="lightgrey">Colored Button</Button>
    <Button color="darkgrey">Colored Button</Button>
    <Button color="black">Colored Button</Button>
  </>
)

export const MarginedButton: React.FC = () => (
  <Button m="1">Margined Button</Button>
)

export const TypedButton: React.FC = () => (
  <>
    <Button type="primary">Primary Button</Button>
    <Button type="success">Success Button</Button>
    <Button type="danger">Danger Button</Button>
  </>
)

export const BorderButton: React.FC = () => (
  <Button border>Border Button</Button>
)
