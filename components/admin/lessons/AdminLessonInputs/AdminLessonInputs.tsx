import React, { useEffect, useState } from 'react'
import {
  AddModuleMutation,
  UpdateModuleMutation,
  useAddModuleMutation,
  useUpdateModuleMutation
} from '../../../../graphql'
import { formChange } from '../../../../helpers/formChange'
import { FormCard, MD_INPUT, Option, TextField } from '../../../FormCard'
import styles from './adminLessonInputs.module.scss'
import { get } from 'lodash'
import {
  ApolloError,
  OperationVariables,
  ApolloQueryResult
} from '@apollo/client'
import QueryInfo from '../../../QueryInfo'

type Module = { id: number; name: string; content: string; order: number }

export type Props = {
  lessonId: number
  refetch: (variables?: Partial<OperationVariables>) => Promise<
    ApolloQueryResult<{
      modules: Module[]
    }>
  >
  title?: string
  onAddModule?: (
    m:
      | (AddModuleMutation['addModule'] & { lesson: { id: number } })
      | (UpdateModuleMutation['updateModule'] & { lesson: { id: number } })
      | null,
    e: { name: string; content: string; order: number } | null
  ) => void
  module?: Module
}

enum Error {
  InvalidData = 'missing module name, description, or order'
}

const initValues = (
  nameValue?: string,
  descValue?: string,
  orderValue?: number
): [TextField, TextField, Option] => [
  {
    title: 'Module Name',
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

const AdminModuleInputs = ({
  title,
  lessonId,
  onAddModule,
  module,
  refetch
}: Props) => {
  const [formOptions, setFormOptions] = useState<any>(initValues())
  const [name, content, order] = formOptions

  useEffect(
    () =>
      setFormOptions(
        initValues(
          get(module, 'name'),
          get(module, 'content'),
          get(module, 'order')
        )
      ),
    [module]
  )

  const mutationVariables = {
    content: content.value,
    lessonId,
    name: name.value,
    order: +order.value
  }

  const [moduleMutation, { data, error, loading }] = module
    ? useUpdateModuleMutation({
        variables: { ...mutationVariables, id: module.id }
      })
    : useAddModuleMutation({ variables: mutationVariables })

  const [errorMsg, setErrorMsg] = useState(get(error, 'message', ''))

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
      const newModule = await moduleMutation()
      refetch()

      if (onAddModule) {
        const updateModuleData = get(newModule, 'data.updateModule')
        const addModuleData = get(newModule, 'data.addModule')

        onAddModule(
          (updateModuleData && {
            ...updateModuleData,
            lesson: { id: lessonId }
          }) ||
            (addModuleData && {
              ...addModuleData,
              lesson: { id: lessonId }
            }) ||
            null,
          null
        )
      }
    } catch (err) {
      if (onAddModule) {
        onAddModule(null, {
          content: content.value,
          name: name.value,
          order: +order.value
        })
      }

      setErrorMsg((err as ApolloError).message)
    }
  }

  return (
    <div className={styles.container}>
      <QueryInfo
        data={data}
        loading={loading}
        error={errorMsg}
        texts={{
          loading: 'Adding the module...',
          errorTitle: 'Failed to add the module'
        }}
        DataMessage={() => {
          const updateModule = get(data, 'updateModule')
          const addModule = get(data, 'addModule')

          return (
            <span>
              {updateModule ? 'Updated' : 'Added'} the module{' '}
              <strong>
                {get(addModule, 'name') || get(updateModule, 'name')}
              </strong>{' '}
              successfully!
            </span>
          )
        }}
      />
      <FormCard
        title={name.value || title || 'Untitled'}
        values={formOptions}
        onSubmit={{
          title: module ? 'SAVE CHANGES' : 'ADD MODULE',
          onClick: onSubmit
        }}
        onChange={handleChange}
        newBtn
        noBg
      />
    </div>
  )
}

export default AdminModuleInputs
