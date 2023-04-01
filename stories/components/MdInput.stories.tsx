import React, { useState } from 'react'
import { Story } from '@storybook/react'
import { MdInput } from '../../components/MdInput'

export default {
  component: MdInput,
  title: 'Components/MdInput'
}

const Template: Story = (args: { presetValue?: string }) => {
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

export const WithMarkdownInput = Template.bind({})
WithMarkdownInput.args = {
  presetValue: `## This component supports [Markdown](https://www.markdownguide.org/)

### Let's make a numbered list
1. This is *item one*
2. This is item two \`with some inline code\`
3. Don't forget **item three**

### Let's make a bullet list
- Here's a list item
- Another list item followed by a horizontal rule

___

## The text area expands with the size of the content

You can attach an image too:

![cute kitten](https://placekitten.com/200/300)`
}

export const WithHTMLStrings = Template.bind({})
WithHTMLStrings.args = {
  presetValue: `What does the Preview look like...

... if I wrap the HTML in backticks?

\`<div style="color: white; background-color: purple; >C0D3 C0D3 C0D3</div>\`

... if I don't?

<div style="color: white; background-color: purple; padding: 10px">C0D3 C0D3 C0D3</div>`
}
