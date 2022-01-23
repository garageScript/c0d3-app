import React from 'react'
import styles from '../../scss/blockQuote.module.scss'
const BlockQuote: React.FC = ({ children }) => {
  return (
    <div className={`${styles['blockQuote']} d-flex flex-column flex-md-row`}>
      <img
        src="/assets/mdx/lightBulb.svg"
        className={`${styles['blockQuote__bulb']} me-3`}
      />
      {children}
    </div>
  )
}

export default BlockQuote
