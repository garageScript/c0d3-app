import { CheckCircleIcon, AlertFillIcon } from '@primer/octicons-react'
import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import styles from '../../scss/queryInfo.module.scss'

type QueryInfo<T> = {
  data: T
  loading: boolean
  error: string
  texts: {
    loading: string
    errorTitle: string
  }
  DataMessage?: () => JSX.Element
  hide?: boolean
}

const QueryInfo = <T,>({
  data,
  loading,
  error,
  texts,
  DataMessage,
  hide = true
}: QueryInfo<T>) => {
  const [x, setX] = useState(false)

  useEffect(() => setX(false), [data, error])

  if (loading) {
    return (
      <div className={styles.loading}>
        <Spinner animation="grow" size="sm" />
        <span>{texts.loading}</span>
      </div>
    )
  }

  if (x) return <></>

  if (error) {
    if (hide) setTimeout(() => setX(true), 4000)

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
    if (hide) setTimeout(() => setX(true), 4000)

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
