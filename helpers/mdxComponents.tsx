import React from 'react'
import CodeBlock from '../components/mdx/CodeBlock'
import BlockQuote from '../components/mdx/BlockQuote'
import ModalImage from '../components/mdx/ModalImage'
import styles from '../scss/mdx.module.scss'

const MDXcomponents = {
  inlineCode: (props: any) => (
    <div className={`${styles['inline-code']}`} {...props} />
  ),
  code: CodeBlock,
  blockquote: BlockQuote,
  img: ModalImage,
  h1: (props: any) => <h1 className={`${styles['MDX_h1']}`} {...props} />,
  h2: (props: any) => <h2 className={`${styles['MDX_h2']}`} {...props} />,
  h3: (props: any) => <h3 className={`${styles['MDX_h3']}`} {...props} />,
  a: (props: any) => <a className={`${styles['MDX_a']}`} {...props} />,
  td: (props: any) => <td className={`${styles['MDX_td']}`} {...props} />,
  th: (props: any) => <th className={`${styles['MDX_th']}`} {...props} />
}

export default MDXcomponents
