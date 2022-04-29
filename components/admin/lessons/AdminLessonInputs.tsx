import React, { useState } from 'react'
import { useAddModuleMutation } from '../../../graphql'
import { formChange } from '../../../helpers/formChange'
import { FormCard, MD_INPUT, Option } from '../../FormCard'
import { AlertFillIcon, CheckCircleIcon } from '@primer/octicons-react'
import styles from '../../../scss/adminLessonInputs.module.scss'
import { Spinner } from 'react-bootstrap'
import { GraphQLError } from 'graphql-request/dist/types'

type Props = {
  lesson: { title: string; id: number }
}

enum Error {
  InvalidData = 'missing module name or description'
}

const values: Option[] = [
  {
    title: 'Module Name'
  },
  {
    title: 'Description',
    type: MD_INPUT
  }
]

const AdminLessonInputs = ({ lesson }: Props) => {
  const [formOptions, setFormOptions] = useState(values)
  const [name, content] = formOptions

  const [addModuleMutation, { data, error, loading }] = useAddModuleMutation({
    variables: {
      content: (content.value as string) || '',
      lessonId: lesson.id,
      name: (name.value as string) || ''
    }
  })

  const [errorMsg, setErrorMsg] = useState(error?.message || '')

  const handleChange = async (value: string, propertyIndex: number) => {
    await formChange(value, propertyIndex, formOptions, setFormOptions)
  }

  const OnSubmit = async () => {
    try {
      // Empty strings aren't handled in the resolver
      if (!content.value || !name.value) {
        return setErrorMsg(Error.InvalidData)
      }

      setErrorMsg('')
      await addModuleMutation()
    } catch (err) {
      setErrorMsg((err as GraphQLError).message)
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

    if (errorMsg || error) {
      return (
        <div className={styles.error}>
          <AlertFillIcon />
          <span>Failed to add the module: {error?.message || errorMsg}</span>
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
        title={lesson.title}
        values={values}
        onSubmit={{
          title: 'ADD MODULE',
          onClick: OnSubmit
        }}
        onChange={handleChange}
        newBtn
        noBg
      />
    </div>
  )
}

export default AdminLessonInputs
