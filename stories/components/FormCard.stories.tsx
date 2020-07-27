import React from 'react'
import { FormCard } from '../../components/FormCard'

export default {
  component: FormCard,
  title: 'Components/FormCard'
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

export const Basic: React.FC = () => <FormCard values={mockValues} />

export const _WithTitle: React.FC = () => (
  <FormCard values={mockValues} title="clownfish" />
)

export const _WithButton: React.FC = () => (
  <FormCard values={mockValues} buttons={mockBtn} title="clownfish" />
)
