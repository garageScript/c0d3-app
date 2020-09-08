import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import createNewLesson from '../../../graphql/queries/createLesson'
import updateLesson from '../../../graphql/queries/updateLesson'
import { FormCard } from '../../FormCard'
import _ from 'lodash'
import {
  getPropertyArr,
  makeGraphqlVariable,
  errorCheckAllFields,
  errorCheckSingleField
} from '../../../helpers/admin/lessonHelpers'
import { Lesson } from '../../../graphql/index'
import { AdminLessonChallenges, NewChallenge } from './AdminLessonChallenges'
import { lessonSchema } from '../../../helpers/formValidation'

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
  const [alterLesson, { loading, data }] = useMutation(updateLesson)
  const [lessonProperties, setLessonProperties] = useState(
    getPropertyArr(lesson, ['challenges'])
  )
  // when data is fully loaded after sending mutation request, update front-end lessons info
  useEffect(() => {
    !loading && data && setLessons(data.updateLessons)
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
      throw new Error(err)
    }
  }

  const handleChange = async (value: string, propertyIndex: number) => {
    const newLessonProperties = [...lessonProperties]
    newLessonProperties[propertyIndex].value = value
    await errorCheckSingleField(
      newLessonProperties,
      propertyIndex,
      lessonSchema
    )
    setLessonProperties(newLessonProperties)
  }

  return (
    <>
      <div className="mb-2">
        <span className="text-primary font-weight-bold display-3">
          Lesson Info
        </span>
      </div>
      <div>
        <FormCard
          onChange={handleChange}
          values={lessonProperties}
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
  chatUrl: ''
}

// Renders when someone clicks on `create new button` on the sidebar
const NewLesson: React.FC<NewLessonProps> = ({ setLessons }) => {
  const [createLesson, { loading, data }] = useMutation(createNewLesson)
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
      throw new Error(err)
    }
  }

  const handleChange = async (value: string, propertyIndex: number) => {
    let newLessonProperties: any = [...lessonProperties]
    newLessonProperties[propertyIndex].value = value
    await errorCheckSingleField(
      newLessonProperties,
      propertyIndex,
      lessonSchema
    )
    setLessonProperties(newLessonProperties)
  }

  return (
    <div className="col-8 text-center">
      <div className="mb-2">
        <span className="text-primary font-weight-bold display-3">
          Create New Lesson
        </span>
      </div>
      <FormCard
        onChange={handleChange}
        values={lessonProperties}
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
  if (lessons && selectedLesson === lessons.length - 1) {
    return <NewLesson setLessons={setLessons} />
  }

  // set currently selected lesson
  const lesson = lessons && lessons[selectedLesson]

  const lessonId = parseInt(lesson ? lesson.id + '' : '')

  return (
    <div className="col-8 text-center" key={_.uniqueId()}>
      <EditLesson setLessons={setLessons} lesson={lesson} />
      <hr />
      <NewChallenge setLessons={setLessons} lessonId={lessonId} />
      <hr />
      <span className="text-primary font-weight-bold display-3">
        Lesson Challenges
      </span>
      <AdminLessonChallenges
        challenges={lesson && lesson.challenges}
        lessonId={lessonId}
        setLessons={setLessons}
      />
    </div>
  )
}
