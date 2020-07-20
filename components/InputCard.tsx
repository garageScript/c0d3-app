import React, { useState } from 'react'
import { Button } from './theme/Button'
import { MdInput } from './MdInput'

const capitalizeFirst = (str: string) => {
  return str.replace(/./, char => char.toUpperCase())
}

type InputCardProps = {
  values: any
  buttons: any
  capitalizeTitle?: boolean
  bgColor?: 'white' | 'none'
  title?: string
}

type ButtonsProps = {
  buttons: any
  options: any
}

const Buttons: React.FC<ButtonsProps> = ({ buttons, options }) => {
  const btnsList = Object.keys(buttons)

  const btns = btnsList.map((title: string, i: number) => {
    return (
      <div style={{ display: 'inline-block', margin: 10 }} key={i}>
        <Button
          onClick={() => {
            buttons[title] && buttons[title](options)
          }}
          type="success"
        >
          {title}
        </Button>
      </div>
    )
  })

  return <React.Fragment>{btns}</React.Fragment>
}

const InputCard: React.FC<InputCardProps> = ({
  values,
  buttons,
  capitalizeTitle = true,
  title,
  bgColor = 'white'
}) => {
  const [options, saveOptions] = useState(values)
  const titles = Object.keys(values)

  const handleChange = (value: string, title: string) => {
    const newOptions = { ...options }
    newOptions[title] = value
    saveOptions(newOptions)
  }

  const inputs = titles.map((title, i) => {
    if (title === 'id') return []
    //if it is a desciptoin title, i wwant to use mdcomponent
    return (
      <div
        key={i}
        className="d-flex flex-column"
        style={{
          border: '3px solid rgb(84, 64, 216, .3)',
          padding: '10px',
          backgroundColor: 'rgb(84, 64, 216, .04)',
          textAlign: 'left',
          marginBottom: i === titles.length - 1 ? 0 : 10
        }}
      >
        <h5>{(capitalizeTitle && capitalizeFirst(title)) || title}</h5>
        {title === 'description' && (
          <MdInput
            bgColor="white"
            value={options[title] || ''}
            onChange={(value: string) => handleChange(value, title)}
          />
        )}
        {title !== 'description' && (
          <input
            style={{ border: '1px solid rgb(84, 64, 216, .3)' }}
            type="text"
            value={options[title]}
            onChange={e => handleChange(e.target.value, title)}
            className="form-control"
            placeholder=""
            aria-label=""
            aria-describedby="basic-addon1"
          />
        )}
      </div>
    )
  })

  return (
    <div
      style={{
        textAlign: 'center',
        padding: 10,
        backgroundColor: bgColor,
        border: '2px solid rgb(0,0,0,.3)'
      }}
    >
      {title && (
        <h2 style={{ textDecoration: 'underline', marginBottom: 20 }}>
          {title}
        </h2>
      )}
      {inputs}
      <Buttons buttons={buttons} options={options} />
    </div>
  )
}

export { InputCard }
