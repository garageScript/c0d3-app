import React from 'react'
import _ from 'lodash'

type SearchBarProps = {
  searchOption: {
    option: string
    admin: string
    searchTerm: string
  }

  setSearchOption: React.Dispatch<
    React.SetStateAction<{
      option: string
      admin: string
      searchTerm: string
    }>
  >
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchOption,
  setSearchOption
}) => {
  const run = _.debounce(setSearchOption, 500)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchOption = {
      ...searchOption,
      searchTerm: e.target.value
    }
    run(newSearchOption)
  }

  return <input type="text" className="form-control" onChange={handleChange} />
}
