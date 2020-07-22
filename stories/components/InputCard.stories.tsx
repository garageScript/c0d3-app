import React from 'react'
import { InputCard } from '../../components/InputCard'

export default {
  component: InputCard,
  title: 'Components/InputCard'
}

const mockBtn = {
  'Create New Challenge': () => {}
}

const mockValues = {
  super: 'saiyan',
  adorable: 'hamster',
  illegal_doormats: 'rabbit fist'
}

export const Basic: React.FC = () => <InputCard values={mockValues} />

export const _WithTitle: React.FC = () => (
  <InputCard values={mockValues} title="clownfish" />
)

export const _WithButton: React.FC = () => (
  <InputCard values={mockValues} buttons={mockBtn} title="clownfish" />
)
