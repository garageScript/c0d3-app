import * as React from 'react'
import StatusIcon from '../../components/StatusIcon'

export default {
  component: StatusIcon,
  title: 'Components/StatusIcon'
}

export const Basic: React.FC = () => <StatusIcon status="unsubmitted" />

export const Pending: React.FC = () => <StatusIcon status="open" />

export const Rejected: React.FC = () => <StatusIcon status="needMoreWork" />

export const Passed: React.FC = () => <StatusIcon status="passed" />
