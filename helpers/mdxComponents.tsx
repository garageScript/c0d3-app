import React from 'react'
import CodeBlock from '../components/mdx/CodeBlock'
import BlockQuote from '../components/mdx/BlockQuote'
import ModalImage from '../components/mdx/ModalImage'
import styles from '../scss/mdx.module.scss'
import Spoiler from '../components/mdx/Spoiler'
import ChallengeBar from '../components/mdx/ChallengBar'
import CodePen from '../components/mdx/CodePen'
const TwoColumns: React.FC = ({ children }) => {
  return <div className={`${styles['MDX_twoColumns']}`}>{children}</div>
}

const MDXcomponents = {
  inlineCode: (props: any) => (
    <code className={`${styles['inline-code']}`} {...props} />
  ),
  code: CodeBlock,
  blockquote: BlockQuote,
  BlockQuote,
  Image: ModalImage,
  Spoiler: Spoiler,
  twoColumns: TwoColumns,
  ChallengeBar: ChallengeBar,
  CodePen: CodePen,
  h1: (props: any) => <h1 className={`${styles['MDX_h1']}`} {...props} />,
  h2: (props: any) => <h2 className={`${styles['MDX_h2']}`} {...props} />,
  h3: (props: any) => <h3 className={`${styles['MDX_h3']}`} {...props} />,
  ul: (props: any) => <ul className={`${styles['MDX_ul']}`} {...props} />,
  ol: (props: any) => <ol className={`${styles['MDX_ol']}`} {...props} />,
  a: (props: any) => <a className={`${styles['MDX_a']}`} {...props} />,
  p: (props: any) => <p className={`${styles['MDX_p']}`} {...props} />,
  td: (props: any) => <td className={`${styles['MDX_td']}`} {...props} />,
  th: (props: any) => <th className={`${styles['MDX_th']}`} {...props} />
}

export default MDXcomponents
