import React, { useEffect, useState } from 'react'
import {
  AddModuleMutation,
  UpdateModuleMutation,
  useAddModuleMutation,
  useUpdateModuleMutation
} from '../../../graphql'
import { formChange } from '../../../helpers/formChange'
import { FormCard, MD_INPUT, TextField } from '../../FormCard'
import { AlertFillIcon, CheckCircleIcon } from '@primer/octicons-react'
import styles from '../../../scss/adminModuleInputs.module.scss'
import { Spinner } from 'react-bootstrap'
import { get } from 'lodash'
import {
  ApolloError,
  OperationVariables,
  ApolloQueryResult
} from '@apollo/client'

type Module = { id: number; name: string; content: string }

type Props = {
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
    e: { name: string; content: string } | null
  ) => void
  module?: Module
}

enum Error {
  InvalidData = 'missing module name or description'
}

const initValues = (
  nameValue?: string,
  descValue?: string
): [TextField, TextField] => [
  {
    title: 'Module Name',
    value: nameValue || ''
  },
  {
    title: 'Description',
    type: MD_INPUT,
    value: descValue || ''
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
  const [name, content] = formOptions

  useEffect(
    () =>
      setFormOptions(initValues(get(module, 'name'), get(module, 'content'))),
    [module]
  )

  const mutationVariables = {
    content: content.value,
    lessonId,
    name: name.value
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
      if (!content.value || !name.value) {
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
          name: name.value
        })
      }

      setErrorMsg((err as ApolloError).message)
    }
  }

  const QueryStateMessage = () => {
    if (loading) {
      return (
        <div className={styles.loading}>
          <Spinner animation="grow" size="sm" />
          <span>Adding the module...</span>
        </div>
      )
    }

    if (errorMsg) {
      return (
        <div className={styles.error}>
          <AlertFillIcon />
          <span>Failed to add the module: {errorMsg}</span>
        </div>
      )
    }

    if (data) {
      const updateModule = get(data, 'updateModule')
      const addModule = get(data, 'addModule')

      return (
        <div className={styles.success}>
          <CheckCircleIcon />
          <span>
            {updateModule ? 'Updated' : 'Added'} the module{' '}
            <strong>
              {get(addModule, 'name') || get(updateModule, 'name') || ''}
            </strong>{' '}
            successfully!
          </span>
        </div>
      )
    }

    return <></>
  }

  return (
    <div className={styles.container}>
      <QueryStateMessage />
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
