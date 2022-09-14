import { get } from 'lodash'
import React from 'react'
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
    error?: string
  }
  dismiss?: {
    onDismissError?: (id: number) => void
    onDismissData?: (id: number) => void
  }
}

const QueryInfo = <T,>({
  data,
  loading,
  error,
  texts,
  dismiss
}: QueryInfo<T>) => {
  if (loading) {
    return (
      <div className={styles.loading}>
        <Spinner animation="grow" size="sm" />
        <span>{texts.loading}</span>
      </div>
    )
  }

  if (error) {
    return (
      <Alert
        alert={{
          text: texts.error || 'An error occurred. Please try again.',
          type: 'urgent',
          id: 1
        }}
        onDismiss={get(dismiss, 'onDismissError')}
        key={error}
      />
    )
  }

  if (data) {
    return (
      <Alert
        alert={{
          text: texts.data,
          type: 'info',
          id: 2
        }}
        onDismiss={get(dismiss, 'onDismissData')}
      />
    )
  }

  return <></>
}

export default QueryInfo
