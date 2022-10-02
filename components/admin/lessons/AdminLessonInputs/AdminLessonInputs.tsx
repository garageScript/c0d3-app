import React, { useEffect, useState } from 'react'
import { formChange } from '../../../../helpers/formChange'
import { FormCard, MD_INPUT, Option, TextField } from '../../../FormCard'
import styles from './adminLessonInputs.module.scss'
import { get, isEqual } from 'lodash'
import {
  ApolloError,
  OperationVariables,
  ApolloQueryResult
} from '@apollo/client'
import QueryInfo from '../../../QueryInfo'

export type Item = {
  __typename?: string | undefined
  id?: number
  name: string
  content: string
  order: number
  lesson?: { __typename?: string | undefined; id?: number }
}

export type Props<MainItem extends Item> = {
  lessonId: number
  title?: string
  item?: Item
  loading: boolean
  refetch: (variables?: Partial<OperationVariables>) => Promise<
    ApolloQueryResult<{
      [key: string]: MainItem[]
    }>
  >
  onActionFinish?: (
    m:
      | (Item & { lesson: { id: number } })
      | (Item & { lesson: { id: number } })
      | null,
    e: { name: string; content: string; order: number } | null
  ) => void
  action: (options: { variables: Item }) => Promise<
    | {
        [Key in keyof Item]: Item[Key]
      }
    | undefined
  >
}

enum Error {
  InvalidData = 'missing item name, description, or order'
}

const initValues = (
  nameValue?: string,
  descValue?: string,
  orderValue?: number
): [TextField, TextField, Option] => [
  {
    title: 'Item Name',
    value: nameValue || ''
  },
  {
    title: 'Description',
    type: MD_INPUT,
    value: descValue || ''
  },
  {
    title: 'Order',
    value: orderValue
  }
]

const AdminLessonInputs = <MainItem extends Item>({
  title,
  lessonId,
  item,
  loading,
  refetch,
  onActionFinish,
  action
}: Props<MainItem>) => {
  const [formOptions, setFormOptions] = useState<any>(initValues())
  const [name, content, order] = formOptions

  const [data, setData] = useState<null | undefined | typeof item>(null)

  useEffect(
    () =>
      setFormOptions(
        initValues(get(item, 'name'), get(item, 'content'), get(item, 'order'))
      ),
    [item]
  )

  const mutationVariables = {
    content: content.value as string,
    lessonId,
    name: name.value as string,
    order: +order.value as number
  }

  const [dataDiff, setDataDiff] = useState<undefined | typeof data>(data)
  useEffect(
    () => setDataDiff(prev => (isEqual(data, prev) ? undefined : data)),
    [data]
  )

  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = async (value: string, propertyIndex: number) => {
    await formChange(value, propertyIndex, formOptions, setFormOptions)
  }

  const onSubmit = async () => {
    try {
      // Empty strings aren't handled in the resolver
      if (
        !content.value ||
        !name.value ||
        order.value === '' ||
        order.value < 0
      ) {
        return setErrorMsg(Error.InvalidData)
      }

      setErrorMsg('')
      const newItem = await action({
        variables: {
          ...mutationVariables,
          ...(item && { id: item.id })
        }
      })

      setData(newItem)
      refetch()

      if (onActionFinish) {
        onActionFinish(
          (newItem && {
            ...newItem,
            lesson: { id: lessonId }
          }) ||
            null,
          null
        )
      }
    } catch (err) {
      if (onActionFinish) {
        onActionFinish(null, {
          content: content.value,
          name: name.value,
          order: +order.value
        })
      }

      setErrorMsg((err as ApolloError).message)
    }
  }

  const dataText = () => {
    return `${item ? 'Updated' : 'Added'} the item ${
      data?.name || ''
    } successfully!`
  }

  return (
    <div className={styles.container}>
      <QueryInfo
        data={dataDiff}
        loading={loading}
        error={errorMsg}
        texts={{
          loading: 'Adding the item...',
          data: dataText(),
          error: errorMsg
        }}
        dismiss={{
          onDismissError: _ => {
            setErrorMsg('')
            setDataDiff(undefined)
          },
          onDismissData: () => {}
        }}
      />
      <FormCard
        title={name.value || title || 'Untitled'}
        values={formOptions}
        onSubmit={{
          title: item ? 'SAVE CHANGES' : 'ADD ITEM',
          onClick: onSubmit
        }}
        onChange={handleChange}
        newBtn
        noBg
      />
    </div>
  )
}

export default AdminLessonInputs
