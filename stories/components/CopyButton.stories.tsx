import React from 'react'
import CopyButton from '../../components/CopyButton'

export default {
  component: CopyButton,
  title: 'Components/CopyButton'
}

export const Basic: React.FC = () => <CopyButton value={'Test Text'} />
