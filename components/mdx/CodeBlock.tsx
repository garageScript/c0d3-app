//From https://mdxjs.com/guides/syntax-highlighting
import React from 'react'
import Highlight, {
  defaultProps,
  Language,
  PrismTheme
} from 'prism-react-renderer'
import custom from './customTheme'
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
      theme={custom as PrismTheme}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={className}
          style={{ ...style, padding: '20px 20px 0 20px', marginBottom: 0 }}
        >
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
