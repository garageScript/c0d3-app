import * as React from 'react'
import Alert from '../../components/Alert'

const noop = () => {}

export default {
  component: Alert,
  title: 'Components/Alert'
}

export const Info: React.FC = () => (
  <Alert
    alert={{
      id: 0,
      text: 'Set up your computer to submit challenges.',
      type: 'info'
    }}
  />
)

export const Urgent: React.FC = () => (
  <Alert
    alert={{
      id: -1,
      text: 'Invalid password',
      type: 'urgent'
    }}
  />
)

export const infoWithLinkAndDismiss: React.FC = () => (
  <Alert
    alert={{
      id: 0,
      text: 'Set up your computer to submit challenges.',
      type: 'info',
      url: 'https://www.notion.so/JS-0-Foundations-a43ca620e54945b2b620bcda5f3cf672#b45ed85a95e24c9d9fb784afb7a46bcc',
      urlCaption: 'View Instructions'
    }}
    onDismiss={noop}
  />
)

export const urgentWithIconAndDismiss: React.FC = () => (
  <Alert
    alert={{
      id: 0,
      text: 'Please upgrade your CLI client by running npm update c0d3.',
      type: 'urgent',
      url: 'https://www.npmjs.com/package/c0d3',
      urlCaption: 'View NPM Package'
    }}
    onDismiss={noop}
  />
)
