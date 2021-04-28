import * as React from 'react'
import ProgressCard from '../../components/ProgressCard'

export default {
  component: ProgressCard,
  title: 'Components/ProgressCard'
}

export const LoggedOut: React.FC = () => (
  <ProgressCard progressCount={-1} loggedIn={false} />
)
export const Basic: React.FC = () => <ProgressCard progressCount={0} loggedIn />
export const Progress: React.FC = () => (
  <ProgressCard progressCount={40} loggedIn />
)
export const CompletedProgress: React.FC = () => (
  <ProgressCard progressCount={100} loggedIn />
)
