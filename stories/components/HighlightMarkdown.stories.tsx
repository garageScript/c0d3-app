import React from 'react'
import { Story } from '@storybook/react'
import HighlightMarkdown from '../../components/mdx/HighlightMarkdown'

export default {
  component: HighlightMarkdown,
  title: 'Components/HighlightMarkdown'
}

const Template: Story = ({ children, ...props }) => {
  return <HighlightMarkdown {...props}>{children}</HighlightMarkdown>
}

export const Basic = Template.bind({})

Basic.args = {
  children:
    '# Hello World\n## This is a subheading\n### This is a sub-subheading\nThis is a paragraph\n\n```\nconst a = 5;\nconsole.log(a)```'
}

export const WithLanguage = Template.bind({})

WithLanguage.args = {
  children:
    '# Hello World\n## This is a subheading\n### This is a sub-subheading\nThis is a paragraph\n\n```js\nconst a = 5;\nconsole.log(a)```'
}
