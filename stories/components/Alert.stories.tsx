import * as React from 'react'
import Alert from '../../components/Alert'

export default {
  component: Alert,
  title: 'Components/Alert'
}

export const Basic: React.FC = () => (
  <Alert text="Set up your computer to submit challenges." />
)

export const withIcon: React.FC = () => (
  <Alert
    icon="/curriculumAssets/icons/icon-tip.svg"
    text="Set up your computer to submit challenges."
  />
)

export const withInstructions: React.FC = () => (
  <Alert
    text="Set up your computer to submit challenges."
    instructionsUrl="https://www.notion.so/JS-0-Foundations-a43ca620e54945b2b620bcda5f3cf672#b45ed85a95e24c9d9fb784afb7a46bcc"
  />
)

export const withClasses: React.FC = () => (
  <Alert error text="Set up your computer to submit challenges." />
)
