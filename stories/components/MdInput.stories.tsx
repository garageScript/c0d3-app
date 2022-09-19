import React from 'react'
import { MdInput } from '../../components/MdInput'
import { Button } from '../../components/theme/Button'

export default {
  component: MdInput,
  title: 'Components/MdInput'
}

export const Basic: React.FC = () => <MdInput />

export const White: React.FC = () => <MdInput bgColor={'white'} />

export const _WithPresetValue: React.FC = () => {
  return <MdInput bgColor={'white'} value="HinGa DIngA dUrgEN" />
}

export const _WithSubmissionButtons: React.FC = () => {
  return (
    <div>
      <MdInput bgColor={'white'} />
      <Button m="1" btnType="success" color="white">
        Accept
      </Button>

      <Button m="1" btnType="danger" color="white">
        Reject
      </Button>
    </div>
  )
}
