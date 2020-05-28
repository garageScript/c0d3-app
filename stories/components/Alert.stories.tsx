import * as React from 'react'
import Alert from '../../components/Alert'

const noop = prompt => {}

export default {
  component: Alert,
  title: 'Components/Alert'
}

export const Info: React.FC = () => (
  <Alert text="Set up your computer to submit challenges." type="info" />
)

export const Urgent: React.FC = () => (
  <Alert text="Invalid password" type="urgent" />
)

export const infoWithIcon: React.FC = () => (
  <Alert
    icon="/curriculumAssets/icons/icon-tip.svg"
    text="Set up your computer to submit challenges."
    type="info"
  />
)

export const urgentWithIcon: React.FC = () => (
  <Alert
    icon="/curriculumAssets/icons/exclamation.svg"
    text="Please upgrade your CLI client by running npm update c0d3"
    type="urgent"
  />
)

export const infoWithIconAndDismiss: React.FC = () => (
  <Alert
    icon="/curriculumAssets/icons/icon-tip.svg"
    text="Set up your computer to submit challenges."
    type="info"
    setAlertDisplay={noop}
    prompt="setup"
  />
)

export const urgentWithIconAndDismiss: React.FC = () => (
  <Alert
    icon="/curriculumAssets/icons/exclamation.svg"
    text="Please upgrade your CLI client by running npm update c0d3"
    type="urgent"
    setAlertDisplay={noop}
    prompt="cli"
  />
)

export const infoWithInstructions: React.FC = () => (
  <Alert
    text="Set up your computer to submit challenges."
    instructionsUrl="https://www.notion.so/JS-0-Foundations-a43ca620e54945b2b620bcda5f3cf672#b45ed85a95e24c9d9fb784afb7a46bcc"
    type="info"
  />
)
