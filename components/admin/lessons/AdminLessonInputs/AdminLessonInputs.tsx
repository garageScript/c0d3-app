import React, { useEffect, useState } from 'react'
import { formChange } from '../../../../helpers/formChange'
import { FormCard, MD_INPUT, Option, TextField } from '../../../FormCard'
import styles from './adminLessonInputs.module.scss'
import { isEqual } from 'lodash'
import {
  ApolloError,
  OperationVariables,
  ApolloQueryResult
} from '@apollo/client'
import QueryInfo from '../../../QueryInfo'

export type Item = {
  id?: number
  name: string
  content: string
  order: number
  lesson?: { __typename?: string; id?: number }
}

export type Props<MainItem extends Item> = {
  lessonId: number
  title?: string
  item?: Item
  itemName?: string
  loading: boolean
  refetch: (variables?: Partial<OperationVariables>) => Promise<
    ApolloQueryResult<{
      [key: string]: MainItem[]
    }>
  >
  onActionFinish?: (
    m: (Item & { lesson: { id: number } }) | null,
    e: { name: string; content: string; order: number } | null
  ) => void
  action: (options: { variables: Item }) => Promise<Item | undefined>
}

const initValues = (
  nameValue?: string,
  descValue?: string,
  orderValue?: number,
  itemName?: string
): [TextField, TextField, Option] => [
  {
    title: `${
      itemName
        ? itemName[0].toUpperCase() + itemName.slice(1).toLowerCase()
        : 'Item'
    } Name`,
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
  itemName,
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
        initValues(item?.name, item?.content, item?.order, itemName)
      ),
    [item]
  )

  const mutationVariables = {
    content: content.value as string,
    lessonId,
    name: name.value as string,
    order: Number(order.value)
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
        return setErrorMsg(
          `missing ${itemName || 'item'} name, description, or order`
        )
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
          loading: `Adding the ${itemName || 'item'}...`,
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
          title: item
            ? 'SAVE CHANGES'
            : `ADD ${itemName?.toUpperCase() || 'ITEM'}`,
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
