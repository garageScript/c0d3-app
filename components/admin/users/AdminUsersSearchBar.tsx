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
  /*
		The reason debounce is used here is to prevent page rerenders on every keystroke.
		If there is a rerender on every keystroke, the CPU consumption is high and
		creates a perception of the page being slow and sluggish.
    Therefore, we only rerender when the user stops typing
  */
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
