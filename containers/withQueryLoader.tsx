import { useQuery, DocumentNode } from '@apollo/client'
import React from 'react'
import LoadingSpinner from '../components/LoadingSpinner'
import Router from 'next/router'

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
  Router.push('/login')
  return <LoadingSpinner />
}

export default withQueryLoader
