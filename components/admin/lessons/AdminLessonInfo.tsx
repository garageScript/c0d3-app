import React, { useEffect, useState } from 'react'
import * as Sentry from '@sentry/browser'
import { FormCard } from '../../FormCard'
import _ from 'lodash'
import {
  getPropertyArr,
  makeGraphqlVariable,
  errorCheckAllFields
} from '../../../helpers/admin/adminHelpers'
import {
  Lesson,
  useCreateLessonMutation,
  useUpdateLessonMutation
} from '../../../graphql/index'
import { AdminLessonChallenges, NewChallenge } from './AdminLessonChallenges'
import { lessonSchema } from '../../../helpers/formValidation'
import { formChange } from '../../../helpers/formChange'

type LessonInfoProps = {
  lessons: Lesson[] | undefined
  setLessons: React.Dispatch<React.SetStateAction<Lesson[] | null>>
  selectedLesson: number
}

type EditLessonProps = {
  setLessons: React.Dispatch<React.SetStateAction<Lesson[] | null>>
  lesson: Lesson | undefined
}

type NewLessonProps = {
  setLessons: React.Dispatch<React.SetStateAction<Lesson[] | null>>
}

// Creates card for a lessons's information to update
const EditLesson: React.FC<EditLessonProps> = ({ setLessons, lesson }) => {
  const [alterLesson, { loading, data, error }] = useUpdateLessonMutation()
  const [lessonProperties, setLessonProperties] = useState(
    getPropertyArr(lesson, ['challenges', '__typename', 'modules'])
  )
  // when data is fully loaded after sending mutation request, update front-end lessons info
  useEffect(() => {
    !loading && data && setLessons(data.updateLesson)
  }, [data])

  // alter gets called when someone clicks button to update a lesson
  const alter = async () => {
    const newProperties = [...lessonProperties]
    const valid = await errorCheckAllFields(newProperties, lessonSchema)
    if (!valid) {
      setLessonProperties(newProperties)
      return
    }
    try {
      await alterLesson(makeGraphqlVariable(lessonProperties))
    } catch (err) {
      Sentry.captureException(err)
    }
  }

  const handleChange = async (value: string, propertyIndex: number) => {
    await formChange(
      value,
      propertyIndex,
      lessonProperties,
      setLessonProperties,
      lessonSchema
    )
  }

  return (
    <>
      <span className="text-primary fw-bold display-3">Lesson Info</span>
      <div className="mt-3">
        <FormCard
          onChange={handleChange}
          values={lessonProperties}
          submitError={error?.message}
          onSubmit={{ title: 'Update Lesson', onClick: alter }}
          title={lesson && lesson.title + ''}
        />
      </div>
    </>
  )
}

const newLessonAttributes = {
  title: '',
  description: '',
  docUrl: '',
  githubUrl: '',
  videoUrl: '',
  order: '',
  slug: '',
  chatUrl: ''
}

// Renders when someone clicks on `create new button` on the sidebar
const NewLesson: React.FC<NewLessonProps> = ({ setLessons }) => {
  const [createLesson, { loading, data, error }] = useCreateLessonMutation()
  const [lessonProperties, setLessonProperties] = useState(
    getPropertyArr(newLessonAttributes)
  )

  // when data is fully loaded after sending mutation request, update front-end lessons info
  useEffect(() => {
    !loading && data && setLessons(data.createLesson)
  }, [data])

  // alter gets called when someone clicks button to create a lesson
  const alter = async () => {
    const newProperties = [...lessonProperties]
    const valid = await errorCheckAllFields(newProperties, lessonSchema)
    if (!valid) {
      setLessonProperties(newProperties)
      return
    }
    try {
      await createLesson(makeGraphqlVariable(lessonProperties))
      window.location.reload()
    } catch (err) {
      Sentry.captureException(err)
    }
  }

  const handleChange = async (value: string, propertyIndex: number) => {
    await formChange(
      value,
      propertyIndex,
      lessonProperties,
      setLessonProperties,
      lessonSchema
    )
  }

  return (
    <div className="col-8 text-center">
      <div className="mb-2">
        <span className="text-primary fw-bold display-3">
          Create New Lesson
        </span>
      </div>
      <FormCard
        onChange={handleChange}
        values={lessonProperties}
        submitError={error?.message}
        onSubmit={{ title: 'Create Lesson', onClick: alter }}
      />
    </div>
  )
}

export const AdminLessonInfo: React.FC<LessonInfoProps> = ({
  setLessons,
  lessons,
  selectedLesson
}) => {
  // true when user clicks on `create new lesson` button
  if (!lessons || selectedLesson === lessons.length) {
    return <NewLesson setLessons={setLessons} />
  }

  // set currently selected lesson
  const lesson = lessons[selectedLesson] ? lessons[selectedLesson] : lessons[0]

  const lessonId = lesson.id

  return (
    <div className="col-8 text-center" key={_.uniqueId()}>
      <EditLesson setLessons={setLessons} lesson={lesson} />
      <hr />
      <NewChallenge setLessons={setLessons} lessonId={lessonId} />
      <hr />
      <span className="text-primary fw-bold display-3">Lesson Challenges</span>
      <AdminLessonChallenges
        challenges={lesson && lesson.challenges}
        lessonId={lessonId}
        setLessons={setLessons}
      />
    </div>
  )
}
