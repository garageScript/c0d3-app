import React, { useState } from 'react'
import { AddModuleMutation, useAddModuleMutation } from '../../../graphql'
import { formChange } from '../../../helpers/formChange'
import { FormCard, MD_INPUT, TextField } from '../../FormCard'
import { AlertFillIcon, CheckCircleIcon } from '@primer/octicons-react'
import styles from '../../../scss/adminLessonInputs.module.scss'
import { Spinner } from 'react-bootstrap'
import { ApolloError } from 'apollo-server-micro'

type Props = {
  title?: string
  lessonId: number
  onAddModule?: (
    m: AddModuleMutation['addModule'] | null,
    e: { name: string; content: string } | null
  ) => void
}

enum Error {
  InvalidData = 'missing module name or description'
}

const values: [TextField, TextField] = [
  {
    title: 'Module Name',
    value: ''
  },
  {
    title: 'Description',
    type: MD_INPUT,
    value: ''
  }
]

const AdminLessonInputs = ({ title, lessonId, onAddModule }: Props) => {
  const [formOptions, setFormOptions] = useState<any>(values)
  const [name, content] = formOptions

  const [addModuleMutation, { data, error, loading }] = useAddModuleMutation({
    variables: {
      content: content.value || '',
      lessonId,
      name: name.value || ''
    }
  })

  const [errorMsg, setErrorMsg] = useState(error?.message || '')

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
      const newModule = await addModuleMutation()

      if (onAddModule) {
        onAddModule(newModule.data?.addModule || null, null)
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
      return (
        <div className={styles.success}>
          <CheckCircleIcon />
          <span>
            Added the module <strong>{data.addModule.name}</strong>{' '}
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
        values={values}
        onSubmit={{
          title: 'ADD MODULE',
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
