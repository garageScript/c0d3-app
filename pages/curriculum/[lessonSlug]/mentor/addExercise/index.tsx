import React, { useMemo, useState } from 'react'
import {
  AddExerciseMutation,
  GetAppProps,
  Module,
  useAddExerciseMutation,
  withGetApp
} from '../../../../../graphql'
import { useRouter } from 'next/router'
import { AdminLayout } from '../../../../../components/admin/AdminLayout'
import { DropdownMenu } from '../../../../../components/DropdownMenu'
import { FormCard, MD_INPUT } from '../../../../../components/FormCard'
import { formChange } from '../../../../../helpers/formChange'
import { exercisesValidation } from '../../../../../helpers/formValidation'
import ExercisePreview from '../../../../../components/ExercisePreview'
import styles from '../../../../../scss/mentorPage.module.scss'
import { get } from 'lodash'
import QueryInfo from '../../../../../components/QueryInfo'
import { errorCheckAllFields } from '../../../../../helpers/admin/adminHelpers'
import * as Sentry from '@sentry/nextjs'

type DetachedModule = Omit<Module, 'lesson' | 'author'>

type HeaderProps<T> = {
  lesson?: T
  addExerciseData?: AddExerciseMutation | null
  loading: boolean
  error?:
    | {
        message: string
      }
    | string
  setModule: (v: null | DetachedModule) => void
  setErrorMsg: (v: string) => void
}
const Header = <
  T extends { title: string; modules?: DetachedModule[] | null }
>({
  lesson,
  addExerciseData,
  loading,
  error,
  setModule,
  setErrorMsg
}: HeaderProps<T>) => {
  const modules = get(lesson, 'modules') ?? []

  return (
    <header className={styles.header}>
      <div>
        <h1>{get(lesson, 'title')}</h1>
      </div>
      <div className={styles.dropdownWrapper}>
        <span>Select a module</span>
        <DropdownMenu
          title="Select a module"
          items={modules.map(m => ({
            ...m,
            title: m.name,
            onClick: () => {
              setModule({ ...m })
              setErrorMsg('')
            }
          }))}
        />
      </div>
      <QueryInfo
        data={addExerciseData}
        loading={loading}
        error={get(error, 'message', error)}
        texts={{
          loading: 'Adding the exercise...',
          data: 'Added the exercise successfully!',
          error: typeof error === 'string' ? error : ''
        }}
      />
    </header>
  )
}

type MainProps = {
  onClick: () => void
  formOptions: typeof initValues
  handleChange: (value: string, propertyIndex: number) => Promise<void>
  exercise: {
    description: string
    answer: string
    explanation: string
  }
}
const Main = ({ onClick, formOptions, handleChange, exercise }: MainProps) => (
  <main className={styles.main}>
    <div className={styles.wrapper}>
      <div className={styles.forms}>
        <FormCard
          title={''}
          onSubmit={{
            title: 'Save exercise',
            onClick
          }}
          values={formOptions}
          onChange={handleChange}
          newBtn
          noBg
        />
      </div>
      <ExercisePreview
        exercise={{ ...exercise }}
        classes={`col-sm-8 col-md-7 col-lg-6 col-xl-5 px-md-3 border-0 rounded ${styles.exerciseCard}`}
      />
    </div>
  </main>
)

const initValues = [
  {
    title: 'description',
    type: MD_INPUT,
    value: '',
    error: ''
  },
  {
    title: 'answer',
    value: '',
    error: ''
  },
  {
    title: 'explanation',
    type: MD_INPUT,
    value: '',
    error: ''
  }
]

const AddExercisePage = ({ data }: GetAppProps) => {
  const router = useRouter()
  const { lessonSlug } = router.query

  // Omitting author and lesson because data.lessons[i].modules[i] mismatching type
  const [module, setModule] = useState<null | DetachedModule>(null)
  const [errorMsg, setErrorMsg] = useState('')

  const { lessons } = data
  const lesson = useMemo(
    () => (lessons || []).find(lesson => lesson.slug === lessonSlug),
    [lessons]
  )

  const [formOptions, setFormOptions] = useState(initValues)
  const [description, answer, explanation] = formOptions

  const [addExercise, { data: addExerciseData, loading, error }] =
    useAddExerciseMutation({
      variables: {
        moduleId: get(module, 'id', -1),
        description: description.value,
        answer: answer.value,
        explanation: explanation.value
      }
    })

  const handleChange = async (value: string, propertyIndex: number) => {
    await formChange(
      value,
      propertyIndex,
      formOptions,
      setFormOptions,
      exercisesValidation
    )
  }

  const onClick = async () => {
    try {
      const newProperties = [...formOptions]
      const valid = await errorCheckAllFields(
        newProperties,
        exercisesValidation
      )

      if (!module) {
        setErrorMsg('Please select a module')
        return
      }

      if (!valid) {
        // Update the forms so the error messages appear
        setFormOptions(newProperties)
        return
      }

      await addExercise()
    } catch (err) {
      Sentry.captureException(err)
    }
  }

  return (
    <AdminLayout data={data}>
      <Header
        lesson={lesson}
        addExerciseData={addExerciseData}
        loading={loading}
        error={errorMsg || error}
        setModule={setModule}
        setErrorMsg={setErrorMsg}
      />
      <Main
        onClick={onClick}
        formOptions={formOptions}
        handleChange={handleChange}
        exercise={{
          description: description.value,
          answer: answer.value,
          explanation: explanation.value
        }}
      />
    </AdminLayout>
  )
}

export default withGetApp()(AddExercisePage)
