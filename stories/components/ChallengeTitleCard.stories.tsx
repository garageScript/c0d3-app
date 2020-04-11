import * as React from 'react'
import { action } from '@storybook/addon-actions'
import { ChallengeTitleCard } from '../../components/ChallengeMaterial'

export default {
  component: ChallengeTitleCard,
  title: 'Components/ChallengeTitleCard'
}

const props = {
  key: '105',
  description:
    'Write a function that takes in a number and returns true if that number is greater than 5. Otherwise, return false.',
  id: '105',
  challengeNum: 0,
  title: 'Greater than 5',
  setCurrentChallenge: action('clicked')
}

export const Basic: React.FC = () => <ChallengeTitleCard {...props} />
