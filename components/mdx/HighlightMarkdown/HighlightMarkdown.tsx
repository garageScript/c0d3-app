import React from 'react'
import Markdown from 'markdown-to-jsx'
import MDXcomponents from '../../../helpers/mdxComponents'

type Props = {
  children: string
  wrapper?: string
  [key: string]: any
}

const HighlightMarkdown: React.FC<Props> = ({ children, ...props }) => {
  return (
    <Markdown
      {...props}
      options={{
        overrides: {
          pre: props => {
            const propsOfChildren = props.children.props
            const children = propsOfChildren.children
            const language = propsOfChildren?.className?.split('-')[1]

            return (
              <MDXcomponents.code className={language || ''}>
                {/* Workaround for adding a line-break after the last token in a codeblock */}
                {`${children}\n`}
              </MDXcomponents.code>
            )
          },
          code: props => {
            return (
              <MDXcomponents.inlineCode>
                {props.children}
              </MDXcomponents.inlineCode>
            )
          }
        }
      }}
    >
      {children}
    </Markdown>
  )
}

export default HighlightMarkdown
