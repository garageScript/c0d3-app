import * as React from 'react'
import CodeBlock from '../../components/CodeBlock'

export default {
  component: CodeBlock,
  title: 'Components/Codeblock '
}

export const JSX: React.FC = () => (
  /* eslint-disable */
  <CodeBlock className="jsx">
    import * as React from 'react' const b = 3 console.log('foobar')
  </CodeBlock>
  /* eslint-enable */
)
