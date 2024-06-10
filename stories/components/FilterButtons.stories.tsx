import React, { useState } from 'react'
import FilterButtons from '../../components/FilterButtons'
import _ from 'lodash'

export default {
  component: FilterButtons,
  title: 'Components/FilterButtons'
}

type MockThemeProps = {
  theme: 'success' | 'danger' | 'primary'
}

const colorsArr = ['success', 'danger', 'primary']
const mockOptions = ['Admins', 'Non-Admins', 'None']

const MockBasic: React.FC = () => {
  const [option, setOption] = useState(mockOptions[1])

  return (
    <FilterButtons
      currentOption={option}
      onClick={setOption}
      options={mockOptions}
    >
      Filter By:
    </FilterButtons>
  )
}

const MockColor: React.FC<MockThemeProps> = ({ theme }) => {
  const [option, setOption] = useState(mockOptions[0])

  return (
    <FilterButtons
      currentOption={option}
      onClick={setOption}
      options={mockOptions}
      theme={theme}
    >
      {_.capitalize(theme) + ':'}
    </FilterButtons>
  )
}

export const Basic: React.FC = () => {
  return <MockBasic />
}

export const Colors: React.FC = () => {
  const list = colorsArr.map((theme: any, key: number) => {
    return <MockColor theme={theme} key={key} />
  })

  return <div>{list}</div>
}
