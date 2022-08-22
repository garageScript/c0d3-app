import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import styles from '../../scss/queryInfo.module.scss'
import Alert from '../Alert'

type QueryInfo<T> = {
  data: T
  loading: boolean
  error: string
  texts: {
    loading: string
    data: string
  }
  hide?: boolean
}

const QueryInfo = <T,>({
  data,
  loading,
  error,
  texts,
  hide = true
}: QueryInfo<T>) => {
  const [isHidden, setHidden] = useState(false)

  useEffect(() => setHidden(false), [data, error])

  if (loading) {
    return (
      <div className={styles.loading}>
        <Spinner animation="grow" size="sm" />
        <span>{texts.loading}</span>
      </div>
    )
  }

  if (isHidden) return <></>

  if (error) {
    if (hide) setTimeout(() => setHidden(true), 4000)

    return (
      <Alert
        alert={{
          text: 'An error occurred. Please try again.',
          type: 'urgent',
          id: 1
        }}
      />
    )
  }

  if (data) {
    if (hide) setTimeout(() => setHidden(true), 4000)

    return (
      <Alert
        alert={{
          text: texts.data,
          type: 'info',
          id: 2
        }}
      />
    )
  }

  return <></>
}

export default QueryInfo
