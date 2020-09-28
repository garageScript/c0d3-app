import React, { useState } from 'react'
import {
  FormCard,
  MD_INPUT,
  Option,
  DROP_DOWN
} from '../../components/FormCard'
import { Item } from '../../components/DropdownMenu'

export default {
  component: FormCard,
  title: 'Components/FormCard'
}

const mockBtn = {
  title: 'Create New Challenge',
  onClick: () => {}
}

const mockValues: Option[] = [
  { title: 'nickname', value: 'ChickenFarmer00', error: 'Required' },
  { title: 'description', value: 'Amazing farm of chicken' },
  { title: 'title', value: 'oheuhehe', type: MD_INPUT },
  { title: 'level', value: 'noob' }
]

const MockBasic: React.FC = () => {
  const onClick = (title: any) => onChange(title, 4)
  const mockedDropdown = [
    ...mockValues,
    {
      title: 'Swiggity Swag',
      value: [
        {
          title: 'Lolzz',
          as: 'button',

          onClick: onClick
        },
        {
          title: 'pineApple bananozna',
          as: 'button',
          onClick: onClick
        }
      ] as Item[],
      type: DROP_DOWN
    },
    { title: 'suupa', value: 'choob' }
  ]
  const [options, setOptions] = useState(mockedDropdown)
  const onChange = (value: string, index: number) => {
    const newOptions: any = [...options]

    if (!(options[index].value instanceof Array)) {
      newOptions[index].value = value
      return setOptions(newOptions)
    }
    // if code is run here, it means field is a dropdown menu
    let save

    // remove dropdown item from array
    const newDropdownItems: any = newOptions[index].value.filter((e: any) => {
      if (e.title === value) {
        save = e
        return false
      }
      return true
    })

    // put as first item in array to make it appear first
    newDropdownItems.unshift(save)
    newOptions[index].value = newDropdownItems
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

const MockWithBorder: React.FC = () => {
  const [options, setOptions] = useState(mockValues)
  const onChange = (value: string, index: number) => {
    const newOptions = [...options]
    newOptions[index].value = value
    setOptions(newOptions)
  }

  return (
    <FormCard
      border={true}
      onChange={onChange}
      values={options}
      title="clownfish"
      onSubmit={mockBtn}
    />
  )
}

export const Basic: React.FC = () => (
  <div className="col-5 m-auto">
    <MockBasic />
  </div>
)

export const _WithTitle: React.FC = () => (
  <div className="col-5 m-auto">
    <MockWithTitle />
  </div>
)

export const _WithBorder: React.FC = () => (
  <div className="col-5 m-auto">
    <MockWithBorder />
  </div>
)

export const _WithValidation: React.FC = () => (
  <div className="col-5 m-auto">
    <MockWithValidation />
  </div>
)
