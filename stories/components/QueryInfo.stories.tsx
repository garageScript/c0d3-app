import React from 'react'
import QueryInfo from '../../components/QueryInfo'

export default {
  component: QueryInfo,
  title: 'Component/QueryInfo'
}

export const Basic = () => (
  <QueryInfo
    data={{
      title: 'JavaScript'
    }}
    loading={false}
    error={''}
    texts={{
      loading: 'Sending the request...',
      data: 'Update the module successfully!'
    }}
  />
)

export const BasicWithDismiss = () => (
  <QueryInfo
    data={{
      title: 'JavaScript'
    }}
    loading={false}
    error={''}
    texts={{
      loading: 'Sending the request...',
      data: 'Update the module successfully!'
    }}
    dismiss={{
      onDismissData: () => {}
    }}
  />
)

export const Error = () => (
  <QueryInfo
    data={{
      title: 'JavaScript'
    }}
    loading={false}
    error={'JavaScript is not related to Java!'}
    texts={{
      loading: 'Sending the request...',
      data: ''
    }}
  />
)

export const ErrorWithCustomMsg = () => (
  <QueryInfo
    data={{
      title: 'JavaScript'
    }}
    loading={false}
    error={'JavaScript is not related to Java!'}
    texts={{
      loading: 'Sending the request...',
      data: '',
      error: 'Bad error'
    }}
  />
)

export const ErrorWithDismiss = () => (
  <QueryInfo
    data={{
      title: 'JavaScript'
    }}
    loading={false}
    error={'JavaScript is not related to Java!'}
    texts={{
      loading: 'Sending the request...',
      data: ''
    }}
    dismiss={{
      onDismissError: () => {}
    }}
  />
)

export const _WithLoading = () => (
  <QueryInfo
    data={{
      title: 'JavaScript'
    }}
    loading={true}
    error={''}
    texts={{
      loading: 'Sending the request...',
      data: ''
    }}
  />
)
