import React from 'react'
import { action } from '@storybook/addon-actions'
import InputGroup from '../../components/InputGroup'

export default {
  component: InputGroup,
  title: 'Components/InputGroup'
}

export const SizeSmall: React.FC = () => {
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

export const SizeDefault: React.FC = () => {
  return (
    <InputGroup
      text="Join Waitlist"
      placeholder="Type in your email address"
      onClick={action('clicked')}
      onChange={action('change')}
    />
  )
}

export const SizeLarge: React.FC = () => {
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

export const Disabled: React.FC = () => {
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
