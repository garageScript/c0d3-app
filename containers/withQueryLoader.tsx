import { useQuery, DocumentNode } from '@apollo/client'
import React from 'react'
import LoadingSpinner from '../components/LoadingSpinner'

type QueryProps = {
  query: DocumentNode
  getParams?: Function
}

export type QueryDataProps<T> = {
  queryData: T
}

const withQueryLoader = <T extends {}>(
  { query, getParams = () => ({}) }: QueryProps,
  Component: React.FC<QueryDataProps<T>>
) => (props: any) => {
  const { loading, data } = useQuery(query, getParams(props))
  if (loading) {
    return <LoadingSpinner />
  }
  if (data) {
    return <Component queryData={data} {...props} />
  }

  return <h1>No Data...</h1>
}

export default withQueryLoader
