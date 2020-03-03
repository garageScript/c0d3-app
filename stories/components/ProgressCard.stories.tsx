import * as React from 'react'
import ProgressCard from '../../components/ProgressCard'

export default {
  component: ProgressCard,
  title: 'Components/ProgressCard'
}

export const Basic: React.FC = () => (
  <ProgressCard progressCount={0}></ProgressCard>
)
