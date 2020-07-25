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

const mockValues = [{ title: 'super', value: 'saiyan' }]

export const Basic: React.FC = () => <InputCard values={mockValues} />

export const _WithTitle: React.FC = () => (
  <InputCard values={mockValues} title="clownfish" />
)

export const _WithButton: React.FC = () => (
  <InputCard values={mockValues} buttons={mockBtn} title="clownfish" />
)
