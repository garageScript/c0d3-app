import * as React from 'react'
import { ChallengeTitleCard } from '../../components/ChallengeMaterial'

export default {
  component: ChallengeTitleCard,
  title: 'Components/ChallengeTitleCard'
}

export const Basic: React.FC = () => (
  <ChallengeTitleCard title="Less Than or Equal to 5." challengeNum={1} />
)
