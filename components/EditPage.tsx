import React from 'react'
import styles from '../scss/mdx.module.scss'

interface Props {
  filePath: String
}

const EditPage: React.FC<Props> = ({ filePath }) => {
  return (
    <a
      href={`https://github.com/garageScript/c0d3-app/edit/master/${filePath}`}
      className={`${styles['MDX_a']} ${styles['edit']}`}
    >
      Edit this page
    </a>
  )
}

export default EditPage
