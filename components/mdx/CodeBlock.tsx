//From https://mdxjs.com/guides/syntax-highlighting
import React from 'react'
import Highlight, { defaultProps, Language } from 'prism-react-renderer'
import github from 'prism-react-renderer/themes/github'
type Props = {
  className: Language
  children: string
}
const CodeBlock: React.FC<Props> = ({ children, className }) => {
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
}

export default CodeBlock
