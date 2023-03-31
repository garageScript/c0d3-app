import React, { useState } from 'react'
import { Story } from '@storybook/react'
import { MdInput } from '../../components/MdInput'
import { Button } from '../../components/theme/Button'

export default {
  component: MdInput,
  title: 'Components/MdInput'
}

const Template: Story = (args: { presetValue?: string }) => {
  // Mock state of parent component (ReviewCard.tsx)
  // so that MdInput responds to typing
  const [commentValue, setCommentValue] = useState(args.presetValue || '')
  return <MdInput value={commentValue} onChange={setCommentValue} {...args} />
}

export const Basic = Template.bind({})

export const White = Template.bind({})
White.args = {
  bgColor: 'white',
  presetValue:
    'Did you notice the white background instead of the default light gray?'
}

export const WithPresetValue = Template.bind({})
WithPresetValue.args = {
  presetValue: `Well done! Keep up the good work :)

Info: there is a \`Array.prototype.reduceRight\` function which you could have used`
}

export const WithHTMLStrings = Template.bind({})
WithHTMLStrings.args = {
  presetValue: `What does the Preview look like...

... if I wrap the HTML in backticks?

\`<div style="color: white; background-color: purple; >C0D3 C0D3 C0D3</div>\`

... if I don't?

<div style="color: white; background-color: purple; padding: 10px">C0D3 C0D3 C0D3</div>`
}

export const WithSubmissionButtons = () => {
  return (
    <div>
      <MdInput value="This input does not respond to typing" />
      <Button m="1" btnType="success" color="white">
        Accept
      </Button>

      <Button m="1" btnType="danger" color="white">
        Reject
      </Button>
    </div>
  )
}
