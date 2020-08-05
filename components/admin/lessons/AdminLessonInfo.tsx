import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import createNewLesson from '../../../graphql/queries/createLesson'
import updateLesson from '../../../graphql/queries/updateLesson'
import { FormCard } from '../../FormCard'
import _ from 'lodash'
import {
  getPropertyArr,
  makeGraphqlVariable,
  checkForErrors,
  checkForAllErrors
} from '../../../helpers/admin/lessonHelpers'
import { Lesson } from '../../../graphql/index'
import { AdminLessonChallenges, NewChallenge } from './AdminLessonChallenges'

export const titleStyle: React.CSSProperties | undefined = {
  fontSize: '4rem',
  fontWeight: 'bold'
}

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
    const errors = checkForAllErrors(newProperties)
    if (errors) {
      setLessonProperties(newProperties)
      return
    }
    try {
      await alterLesson(makeGraphqlVariable(lessonProperties))
    } catch (err) {
      throw new Error(err)
    }
  }

  const handleChange = (value: string, propertyIndex: number) => {
    const newLessonProperties = [...lessonProperties]
    newLessonProperties[propertyIndex].value = value
    checkForErrors(newLessonProperties[propertyIndex])
    setLessonProperties(newLessonProperties)
  }

  return (
    <>
      <span className="text-primary" style={titleStyle}>
        Lesson Info
      </span>
      <div style={{ textAlign: 'center' }} className="card">
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
    const errors = checkForAllErrors(newProperties)
    if (errors) {
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

  const handleChange = (value: string, propertyIndex: number) => {
    const newLessonProperties = [...lessonProperties]
    newLessonProperties[propertyIndex].value = value
    checkForErrors(newLessonProperties[propertyIndex])
    setLessonProperties(newLessonProperties)
  }

  return (
    <div style={{ textAlign: 'center', marginBottom: 20 }} className="col-8">
      <span className="text-primary" style={titleStyle}>
        Create New Lesson
      </span>
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
    <div style={{ textAlign: 'center' }} className="col-8" key={_.uniqueId()}>
      <EditLesson setLessons={setLessons} lesson={lesson} />
      <hr />
      <NewChallenge setLessons={setLessons} lessonId={lessonId} />
      <hr />
      <span className="text-primary" style={titleStyle}>
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
