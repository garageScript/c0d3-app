import React, { useState } from 'react'
import { AdminLayout } from '../../../../components/admin/AdminLayout'
import { FormCard } from '../../../../components/FormCard'
import QueryInfo from '../../../../components/QueryInfo'
import {
  GetAppProps,
  Lesson,
  useCreateLessonMutation,
  withGetApp
} from '../../../../graphql'
import {
  getPropertyArr,
  errorCheckAllFields,
  makeGraphqlVariable
} from '../../../../helpers/admin/adminHelpers'
import { formChange } from '../../../../helpers/formChange'
import { lessonSchema } from '../../../../helpers/formValidation'
import * as Sentry from '@sentry/browser'
import { useRouter } from 'next/router'
import { ADMIN_PATH } from '../../../../constants'
import { ArrowLeftIcon } from '@primer/octicons-react'
import Link from 'next/link'

const Header = () => {
  return (
    <div>
      <Link href={`${ADMIN_PATH}/lessons`}>
        <a className="btn ps-0 d-flex align-items-center mb-3">
          <ArrowLeftIcon size="medium" aria-label="Exit" />
        </a>
      </Link>
      <h1 className="mb-5">Add New Lesson</h1>
    </div>
  )
}

const Body = ({ lesson }: { lesson: Lesson | undefined }) => {
  const router = useRouter()
  const [createLesson, { data, error, loading }] = useCreateLessonMutation()

  const [formOptions, setFormOptions] = useState(
    getPropertyArr(lesson, ['challenges', '__typename', 'modules'])
      // remove the id prop as it's causing errors in the page test
      // because the mutation isn't expecting it as one of the variables
      .filter(e => e.title !== 'id')
      .map(e => {
        let value: string | number = ''

        // auto set order
        if (e.title === 'order' && lesson?.order) {
          value = lesson?.order + 1
        }

        // auto set slug
        if (e.title === 'slug' && lesson?.order) {
          value = `js${lesson?.order + 1}`
        }

        return {
          ...e,
          value
        }
      })
  )

  const handleChange = async (value: string, propertyIndex: number) => {
    await formChange(
      value,
      propertyIndex,
      formOptions,
      setFormOptions,
      lessonSchema
    )
  }

  const onClick = async () => {
    try {
      const newProperties = [...formOptions]
      const valid = await errorCheckAllFields(newProperties, lessonSchema)

      if (!valid) {
        // Update the forms so the error messages appear
        setFormOptions(newProperties)
        return
      }

      const graphQLVariables = makeGraphqlVariable(formOptions)

      await createLesson(graphQLVariables)

      // If slug value does not exist, the check in line 81 will handle it
      const lessonSlug = formOptions.find(e => e.title === 'slug')!.value

      router.push(`${ADMIN_PATH}/lessons/${lessonSlug}/introduction`)
    } catch (err) {
      Sentry.captureException(err)
    }
  }

  return (
    <div>
      <QueryInfo
        data={data}
        loading={loading}
        error={error?.message || ''}
        texts={{
          loading: 'Creating the lesson...',
          data: `Created the lesson successfully!`
        }}
        dismiss={{
          onDismissData: () => {},
          onDismissError: () => {}
        }}
      />
      <div>
        <FormCard
          noBg
          values={formOptions}
          onSubmit={{
            title: 'Create Lesson',
            onClick
          }}
          onChange={handleChange}
          newBtn
        />
      </div>
    </div>
  )
}

const AddNewLessonPage: React.FC<GetAppProps> = ({ data }) => {
  const lastLesson = data?.lessons?.at(-1)

  return (
    <AdminLayout data={data}>
      <Header />
      <Body lesson={lastLesson as Lesson} />
    </AdminLayout>
  )
}

export default withGetApp()(AddNewLessonPage)
