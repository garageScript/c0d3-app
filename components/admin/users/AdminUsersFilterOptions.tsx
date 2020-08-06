import React from 'react'
import _ from 'lodash'
import { Button } from '../../theme/Button'
import { headerValues, userProperties } from './AdminUsersTable'

const adminFilters = ['Admins', 'Non-Admins', 'None']

type SearchOptionsProps = {
  searchOption: any
  setSearchOption: any
}

export const SearchOptions: React.FC<SearchOptionsProps> = ({
  searchOption,
  setSearchOption
}) => {
  const properties = [...headerValues]

  // delete `isAdmin`(it is the last element) to make it not appear in search options
  properties.pop()

  const buttons = properties.map((userProperty, buttonIndex) => {
    const onClick = () => {
      setSearchOption({
        ...searchOption,
        option: userProperties[buttonIndex]
      })
    }

    const { option } = searchOption
    const color = userProperties[buttonIndex] === option ? 'white' : 'lightgrey'
    const type = userProperties[buttonIndex] === option ? 'primary' : undefined

    return (
      <div key={buttonIndex} style={{ marginTop: '-1.57px' }}>
        <Button onClick={onClick} color={color} type={type}>
          {userProperty}
        </Button>
      </div>
    )
  })

  return (
    <div className="mb-2 d-flex flex-row">
      <h4 className="text-primary font-weight-bold">Search By:</h4>
      {buttons}
    </div>
  )
}

export const FilterOptions: React.FC<SearchOptionsProps> = ({
  searchOption,
  setSearchOption
}) => {
  const filters = adminFilters.map((option, buttonIndex) => {
    const onClick = () => {
      setSearchOption({
        ...searchOption,
        admin: option
      })
    }

    const { admin } = searchOption
    const color = option === admin ? 'white' : 'lightgrey'
    const type = option === admin ? 'primary' : undefined

    return (
      <div key={buttonIndex} style={{ marginTop: '-1.57px' }}>
        <Button onClick={onClick} color={color} type={type} key={buttonIndex}>
          {option}
        </Button>
      </div>
    )
  })

  return (
    <div className="d-flex flex-row" style={{ margin: '10px 0 10px 0' }}>
      <h4 className="text-primary font-weight-bold">Filter By:</h4>
      {filters}
    </div>
  )
}
