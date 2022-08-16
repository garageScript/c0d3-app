import { get } from 'lodash'
import React from 'react'
import QueryInfo from '../../components/QueryInfo'

export default {
  component: QueryInfo,
  title: 'Component/QueryInfo'
}

const updateModule = {
  name: 'Functions in JS'
}

const addModule = null

export const Basic = () => (
  <QueryInfo
    data={{
      title: 'JavaScript'
    }}
    loading={false}
    error={''}
    texts={{
      loading: 'Sending the request...',
      errorTitle: 'Failed to find the text because of'
    }}
    DataMessage={() => (
      <span>
        {updateModule ? 'Updated' : 'Added'} the module{' '}
        <strong>
          {get(addModule, 'name') || get(updateModule, 'name') || ''}
        </strong>{' '}
        successfully!
      </span>
    )}
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
      errorTitle: 'Failed to find the lesson because of'
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
      errorTitle: 'Failed to find the lesson because of'
    }}
  />
)
