import React, { useEffect, useState } from 'react'
import {
  useAddModuleMutation,
  useCreateChallengeMutation,
  useUpdateChallengeMutation,
  useUpdateModuleMutation,
  Challenge
} from '../../../../graphql'
import { formChange } from '../../../../helpers/formChange'
import { FormCard, MD_INPUT, Option, TextField } from '../../../FormCard'
import { AlertFillIcon, CheckCircleIcon } from '@primer/octicons-react'
import styles from './adminLessonInputs.module.scss'
import { Spinner } from 'react-bootstrap'
import { get } from 'lodash'
import {
  ApolloError,
  OperationVariables,
  ApolloQueryResult
} from '@apollo/client'

type Module = { id: number; name: string; content: string; order: number }

export type Props = {
  lessonId: number
  refetchModules?: (variables?: Partial<OperationVariables>) => Promise<
    ApolloQueryResult<{
      modules: Module[]
    }>
  >
  refetchChallenges?: (variables?: Partial<OperationVariables>) => Promise<
    ApolloQueryResult<{
      modules: Challenge[]
    }>
  >
  title?: string
  onAddItem?: (
    m:
      | (Module & { lesson: { id: number } })
      | (Challenge & { lesson: { id: number } })
      | null,
    e: Module | Challenge | null
  ) => void
  module?: Module
  challenge?: Challenge
}

enum Error {
  InvalidData = 'missing item name, description, or order'
}

const initValues = (
  itemName?: string,
  nameValue?: string,
  descValue?: string,
  orderValue?: number
): [TextField, TextField, Option] => [
  {
    title: `${itemName} Name`,
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
  onAddItem,
  module,
  refetchModules,
  challenge,
  refetchChallenges
}: Props) => {
  const isModule = !!refetchModules

  const [formOptions, setFormOptions] = useState<any>(
    initValues(isModule ? 'Module' : 'Challenge')
  )
  const [name, content, order] = formOptions

  useEffect(
    () =>
      setFormOptions(
        initValues(
          isModule ? 'Module' : 'Challenge',
          get(module, 'name'),
          get(module, 'content'),
          get(module, 'order')
        )
      ),
    [module, challenge, refetchChallenges, refetchModules]
  )

  const moduleMutationVariables = {
    content: content.value,
    lessonId,
    name: name.value,
    order: +order.value
  }

  const challengeMutationVariables = {
    description: content.value,
    lessonId,
    title: name.value,
    order: +order.value
  }

  const [
    moduleMutation,
    { data: moduleData, error: moduleError, loading: moduleLoading }
  ] = module
    ? useUpdateModuleMutation({
        variables: { ...moduleMutationVariables, id: module.id }
      })
    : useAddModuleMutation({
        variables: moduleMutationVariables
      })

  const [
    challengeMutation,
    { data: challengeData, error: challengeError, loading: challengeLoading }
  ] = challenge
    ? useUpdateChallengeMutation({
        variables: { ...challengeMutationVariables, id: challenge.id }
      })
    : useCreateChallengeMutation({ variables: challengeMutationVariables })

  const [errorMsg, setErrorMsg] = useState(
    get(moduleError || challengeError, 'message', '')
  )

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

      const newItem = isModule
        ? await moduleMutation()
        : await challengeMutation()

      if (isModule) {
        refetchModules()
      } else if (refetchChallenges) {
        refetchChallenges()
      }

      if (onAddItem) {
        const updateItemData = isModule
          ? get(newItem, 'data.updateModule')
          : get(newItem, 'data.updateChallenge')
        const addItemData = isModule
          ? get(newItem, 'data.addModule')
          : get(newItem, 'data.createChallenge')

        onAddItem(
          (updateItemData && {
            ...updateItemData,
            lesson: { id: lessonId }
          }) ||
            (addItemData && {
              ...addItemData,
              lesson: { id: lessonId }
            }) ||
            null,
          null
        )
      }
    } catch (err) {
      if (onAddItem) {
        if (isModule) {
          onAddItem(null, {
            content: content.value,
            name: name.value,
            order: +order.value,
            id: -1
          })
        } else {
          onAddItem(null, {
            description: content.value,
            title: name.value,
            order: +order.value,
            id: -1,
            lessonId
          })
        }
      }

      setErrorMsg((err as ApolloError).message)
    }
  }

  const QueryStateMessage = () => {
    if (isModule ? moduleLoading : challengeLoading) {
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
          <span>
            Failed to add the {isModule ? 'module' : 'challenge'}: {errorMsg}
          </span>
        </div>
      )
    }

    if (moduleData || challengeData) {
      const updateItem = isModule
        ? get(moduleData, 'updateModule')
        : get(challengeData, 'updateChallenge')
      const addItem = isModule
        ? get(moduleData, 'addModule')
        : get(challengeData, 'createChallenge')

      return (
        <div className={styles.success}>
          <CheckCircleIcon />
          <span>
            {updateItem ? 'Updated' : 'Added'} the{' '}
            {isModule ? 'module' : 'challenge'}{' '}
            <strong>
              {get(addItem, 'name') || get(updateItem, 'name') || ''}
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
          title:
            module || challenge
              ? 'SAVE CHANGES'
              : `ADD ${isModule ? 'MODULE' : 'CHALLENGE'}`,
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
