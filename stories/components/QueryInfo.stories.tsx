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
    hide={false}
  />
)

export const _WithError = () => (
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
    hide={false}
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
    hide={false}
  />
)

export const _WithHide = () => (
  // "hide" prop is optional and it's true by default
  <div>
    <p>Hides after 4 seconds</p>
    <QueryInfo
      data={{
        title: 'JavaScript'
      }}
      loading={false}
      error={''}
      texts={{
        loading: 'Sending the request...',
        data: 'Hiding in 4 seconds'
      }}
    />
  </div>
)
