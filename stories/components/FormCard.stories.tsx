import React, { useState } from 'react'
import {
  FormCard,
  MD_INPUT,
  Option,
  DROP_DOWN
} from '../../components/FormCard'
import { Item } from '../../components/DropdownMenu'
import { formChange } from '../../helpers/formChange'

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
    formChange(value, index, options, setOptions)
  }

  return <FormCard onChange={onChange} values={options} onSubmit={mockBtn} />
}

const MockWithTitle: React.FC = () => {
  const [options, setOptions] = useState(mockValues)
  const onChange = (value: string, index: number) => {
    formChange(value, index, options, setOptions)
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
    formChange(value, index, options, setOptions)
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
    formChange(value, index, options, setOptions)
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

const MockWithNoBackground: React.FC = () => {
  const [options, setOptions] = useState(mockValues)
  const onChange = (value: string, index: number) => {
    formChange(value, index, options, setOptions)
  }

  return (
    <FormCard
      onChange={onChange}
      values={options}
      title="clownfish"
      onSubmit={mockBtn}
      noBg
    />
  )
}

const MockAlignedRight: React.FC = () => {
  const [options, setOptions] = useState(mockValues)
  const onChange = (value: string, index: number) => {
    formChange(value, index, options, setOptions)
  }

  return (
    <FormCard
      onChange={onChange}
      values={options}
      title="clownfish"
      onSubmit={mockBtn}
      align="right"
    />
  )
}

const MockAlignedCenter: React.FC = () => {
  const [options, setOptions] = useState(mockValues)
  const onChange = (value: string, index: number) => {
    formChange(value, index, options, setOptions)
  }

  return (
    <FormCard
      onChange={onChange}
      values={options}
      title="clownfish"
      onSubmit={mockBtn}
      align="center"
    />
  )
}

const MockWithNewButton: React.FC = () => {
  const [options, setOptions] = useState(mockValues)
  const onChange = (value: string, index: number) => {
    formChange(value, index, options, setOptions)
  }

  return (
    <FormCard onChange={onChange} values={options} onSubmit={mockBtn} newBtn />
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

export const _WithNoBackground: React.FC = () => (
  <div className="col-5 m-auto">
    <MockWithNoBackground />
  </div>
)

export const AlignedRight: React.FC = () => (
  <div className="col-5 m-auto">
    <MockAlignedRight />
  </div>
)

export const AlignedCenter: React.FC = () => (
  <div className="col-5 m-auto">
    <MockAlignedCenter />
  </div>
)

export const _WithNewButton: React.FC = () => (
  <div className="col-5 m-auto">
    <MockWithNewButton />
  </div>
)
