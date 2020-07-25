import React from 'react'
import { InputCard } from '../../components/InputCard'

export default {
  component: InputCard,
  title: 'Components/InputCard'
}

const mockBtn = [
  {
    title: 'Create New Challenge',
    onClick: () => {}
  }
]

const mockValues = [
  { title: 'Nickname', value: 'ChickenFarmer00' },
  { title: 'Description', value: 'Amazing farm of chicken' },
  { title: 'Title', value: 'oheuhehe' },
  { title: 'Level', value: 'noob' }
]

export const Basic: React.FC = () => <InputCard values={mockValues} />

export const _NoColorBackground: React.FC = () => (
  <InputCard values={mockValues} bgColor="none" />
)

export const _WithTitle: React.FC = () => (
  <InputCard values={mockValues} title="clownfish" />
)

export const _WithButton: React.FC = () => (
  <InputCard values={mockValues} buttons={mockBtn} title="clownfish" />
)
