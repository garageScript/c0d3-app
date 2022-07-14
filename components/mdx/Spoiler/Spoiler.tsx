import React from 'react'
import styles from './spoiler.module.scss'

type Props = {
  name?: string
}
const Spoiler: React.FC<Props> = ({ children, name }) => {
  return (
    <details className="mb-3">
      <summary>{name || 'Answer'}</summary>
      <div className={styles.content}>{children}</div>
    </details>
  )
}

export default Spoiler
