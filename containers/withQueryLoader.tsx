import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { DocumentNode } from 'apollo-boost'
import LoadingSpinner from '../components/LoadingSpinner'
import { DismissedAlerts } from '../@types/alerts'

type QueryProps = {
  query: DocumentNode
  getParams?: Function
}

export type WithQueryProps = {
  queryData: any
  dismissedAlerts: DismissedAlerts
  setDismissedAlerts: React.Dispatch<React.SetStateAction<DismissedAlerts>>
}

const withQueryLoader = (
  { query, getParams = () => ({}) }: QueryProps,
  Component: React.FC<any>
) => (props: any) => {
  const { loading, data } = useQuery(query, getParams(props))
  const [dismissedAlerts, setDismissedAlerts] = useState<DismissedAlerts>({})
  useEffect(() => {
    const localDismissedAlerts = localStorage.getItem('dismissedAlerts')
    if (localDismissedAlerts) {
      setDismissedAlerts(JSON.parse(localDismissedAlerts))
    }
  }, [])
  useEffect(() => {
    localStorage.setItem('dismissedAlerts', JSON.stringify(dismissedAlerts))
  }, [dismissedAlerts])
  if (loading) {
    return <LoadingSpinner />
  }
  if (data) {
    return (
      <Component
        queryData={data}
        dismissedAlerts={dismissedAlerts}
        setDismissedAlerts={setDismissedAlerts}
        {...props}
      />
    )
  }

  return <h1>No Data...</h1>
}

export default withQueryLoader
