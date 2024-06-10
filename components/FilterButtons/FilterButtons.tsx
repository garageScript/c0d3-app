import React from 'react'
import { Button } from '../theme/Button'

type FilterProps = {
  options: string[]
  onClick: Function
  currentOption: string
  theme?: 'success' | 'danger' | 'primary' | undefined
}

const FilterButtons: React.FC<FilterProps> = ({
  options,
  onClick,
  currentOption,
  children,
  theme = 'primary'
}) => {
  //incase someone puts in a currentOption value that is not in options array
  if (!options.includes(currentOption)) currentOption = options[0]

  const filters = options.map((option, buttonIndex) => {
    const color = option === currentOption ? 'white' : 'lightgrey'
    const type = option === currentOption ? theme : undefined

    return (
      <div key={buttonIndex} style={{ marginTop: '-1.57px' }}>
        <Button onClick={() => onClick(option)} color={color} btnType={type}>
          {option}
        </Button>
      </div>
    )
  })

  return (
    <div className="d-flex flex-row">
      <h4 className={`text-${theme} fw-bold me-1`}>{children}</h4>
      {filters}
    </div>
  )
}

export default FilterButtons
