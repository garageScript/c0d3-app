import React, { useState } from 'react'
import styles from '../../scss/spoiler.module.scss'
type Props = {
  name?: string
}
const Spoiler: React.FC<Props> = ({ children, name }) => {
  const [status, setStatus] = useState({
    css: { display: 'none' },
    name: 'spoiler-arrow__right'
  })
  const onClick = () => {
    status.css.display === 'none'
      ? setStatus({ css: { display: 'inherit' }, name: 'spoiler-arrow__down' })
      : setStatus({ css: { display: 'none' }, name: 'spoiler-arrow__right' })
  }
  return (
    <>
      <div className="mb-1 ml-1 spoiler" onClick={onClick}>
        <div className="d-flex">
          <div className={`${styles[status.name]} align-self-center mr-3`} />
          <div className={`${styles['spoiler__title']}`}>
            {name || 'Answer'}
          </div>
        </div>
      </div>
      <div style={status.css}>{children}</div>
    </>
  )
}

export default Spoiler
