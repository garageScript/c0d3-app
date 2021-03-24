import * as React from 'react'
import CodeBlock from '../../../components/mdx/CodeBlock'

export default {
  component: CodeBlock,
  title: 'mdx/Codeblock '
}

export const Component: React.FC = () => (
  <CodeBlock className="jsx">
    {`const CodeBlock: React.FC<Props> = ({ children, className }) => {
  const language = className.replace(/language-/, '') as Language
  return (
    <Highlight
      {...defaultProps}
      code={children}
      language={language}
      theme={github}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={{ ...style, padding: '20px' }}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )
}`}
  </CodeBlock>
)
