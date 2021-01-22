import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { DocumentNode } from 'apollo-boost'
import LoadingSpinner from '../components/LoadingSpinner'
import Error from '../components/Error'

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
  return (
    <Error
      title="Internal server error"
      message="No data"
      src="/500.png"
    ></Error>
  )
}

export default withQueryLoader
