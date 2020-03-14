import * as React from 'react'
import Alert from '../../components/Alert'

export default {
  component: Alert,
  title: 'Components/Alert'
}

export const Basic: React.FC = () => (
  <Alert text="Set up your computer to submit challenges." />
)
