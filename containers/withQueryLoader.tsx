import React from 'react'
import { useQuery } from '@apollo/client'
import { DocumentNode } from '@apollo/client'
import LoadingSpinner from '../components/LoadingSpinner'
import { useRouter } from 'next/router'
type QueryProps = {
  query: DocumentNode
  getParams?: Function
}

export type QueryDataProps<T> = {
  queryData: T
}

const withQueryLoader =
  <T extends {}>(
    { query, getParams = () => ({}) }: QueryProps,
    Component: React.FC<QueryDataProps<T>>
  ) =>
  (props: any) => {
    const router = useRouter()
    const { loading, data } = useQuery(query, getParams(props))
    if (loading) {
      return <LoadingSpinner />
    }
    if (data) {
      return <Component queryData={data} {...props} />
    }
    router.push('/500')
    return <LoadingSpinner />
  }

export default withQueryLoader
