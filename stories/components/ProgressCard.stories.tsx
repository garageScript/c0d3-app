import * as React from 'react'
import ProgressCard from '../../components/ProgressCard'

export default {
  component: ProgressCard,
  title: 'Components/ProgressCard'
}

export const Basic: React.FC = () => <ProgressCard progressCount={0} />
export const Loading: React.FC = () => <ProgressCard progressCount={-1} />
export const Progress: React.FC = () => <ProgressCard progressCount={40} />
export const CompletedProgress: React.FC = () => (
  <ProgressCard progressCount={100} />
)
