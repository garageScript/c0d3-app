import React from 'react'
import { action } from '@storybook/addon-actions'
import InputGroup from '../components/InputGroup'

export default {
  component: InputGroup,
  title: 'InputGroup'
}

export const sizeSmall: React.FC = () => {
  return (
    <InputGroup
      text="Join Waitlist"
      placeholder="Type in your email address"
      size="small"
      onClick={action('clicked')}
      onChange={action('change')}
    />
  )
}

export const sizeDefault: React.FC = () => {
  return (
    <InputGroup
      text="Join Waitlist"
      placeholder="Type in your email address"
      onClick={action('clicked')}
      onChange={action('change')}
    />
  )
}

export const sizeLarge: React.FC = () => {
  return (
    <InputGroup
      text="Join Waitlist"
      placeholder="Type in your email address"
      size="large"
      onClick={action('clicked')}
      onChange={action('change')}
    />
  )
}

export const disabled: React.FC = () => {
  return (
    <InputGroup
      text="Join Waitlist"
      placeholder="Type in your email address"
      onClick={action('clicked')}
      onChange={action('change')}
      isDisabled
    />
  )
}
