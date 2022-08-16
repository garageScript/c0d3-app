import { CheckCircleIcon, AlertFillIcon } from '@primer/octicons-react'
import React from 'react'
import { Spinner } from 'react-bootstrap'
import styles from '../../scss/queryInfo.module.scss'

type QueryInfo = {
  data: any
  loading: boolean
  error: string
  texts: {
    loading: string
    errorTitle: string
  }
  DataMessage?: () => JSX.Element
}

const QueryInfo = ({ data, loading, error, texts, DataMessage }: QueryInfo) => {
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
      <div className={styles.error}>
        <AlertFillIcon />
        <span>
          {texts.errorTitle}: {error}
        </span>
      </div>
    )
  }

  if (data) {
    return (
      <div className={styles.success}>
        <CheckCircleIcon />
        {DataMessage ? (
          <DataMessage />
        ) : (
          <span>Submitted the item successfully!</span>
        )}
      </div>
    )
  }

  return <></>
}

export default QueryInfo
