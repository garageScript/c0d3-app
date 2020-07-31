import React, { useState } from 'react'
import { FormCard, MD_INPUT, Option } from '../../components/FormCard'

export default {
  component: FormCard,
  title: 'Components/FormCard'
}

const mockBtn = {
  title: 'Create New Challenge',
  onClick: () => {}
}

const mockValues: Option[] = [
  { title: 'Nickname', value: 'ChickenFarmer00', error: 'Required' },
  { title: 'Description', value: 'Amazing farm of chicken' },
  { title: 'Title', value: 'oheuhehe', type: MD_INPUT },
  { title: 'Title', value: 'oheuhehe' },
  { title: 'Level', value: 'noob' }
]

const MockBasic: React.FC = () => {
  const [options, setOptions] = useState(mockValues)
  const onChange = (value: string, index: number) => {
    const newOptions = [...options]
    newOptions[index].value = value
    setOptions(newOptions)
  }

  return <FormCard onChange={onChange} values={options} onSubmit={mockBtn} />
}

const MockWithTitle: React.FC = () => {
  const [options, setOptions] = useState(mockValues)
  const onChange = (value: string, index: number) => {
    const newOptions = [...options]
    newOptions[index].value = value
    setOptions(newOptions)
  }

  return (
    <FormCard
      onChange={onChange}
      values={options}
      title="clownfish"
      onSubmit={mockBtn}
    />
  )
}

const MockWithValidation: React.FC = () => {
  const [options, setOptions] = useState(mockValues)
  const onChange = (value: string, index: number) => {
    const newOptions = [...options]
    newOptions[index].value = value
    newOptions[index].error = value ? '' : 'Field cannot be empty'
    setOptions(newOptions)
  }

  return (
    <FormCard
      onChange={onChange}
      values={options}
      title="clownfish"
      onSubmit={mockBtn}
    />
  )
}

export const Basic: React.FC = () => {
  return <MockBasic />
}

export const _WithTitle: React.FC = () => {
  return <MockWithTitle />
}

export const _WithValidation: React.FC = () => {
  return <MockWithValidation />
}
