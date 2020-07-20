import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import createNewLesson from '../graphql/queries/createLesson'
import updateLesson from '../graphql/queries/updateLesson'
import { StyledTitle } from './StyledTitle'
import { InputCard } from './InputCard'
import _ from 'lodash'
import { Button } from './theme/Button'
import { AdminLessonChallenges, NewChallenge } from './AdminLessonChallenges'
import { Lesson } from '../@types/adminLesson'

type LessonInfoProps = {
  lessons: Lesson[]
  setLessons: React.Dispatch<React.SetStateAction<null>>
  selectedLesson: number
}

type LessonBaseProps = {
  setLessons: React.Dispatch<React.SetStateAction<null>>
  lesson: Lesson
}

type NewLessonProps = {
  lesson: Lesson
  setLessons: React.Dispatch<React.SetStateAction<null>>
}

// Creates card for a lessons's information to update
const LessonBase: React.FC<LessonBaseProps> = ({ setLessons, lesson }) => {
  const [alterLesson, { loading, data }] = useMutation(updateLesson)

  // when data is fully loaded after sending mutation request, update front-end lessons info
  useEffect(() => {
    !loading && data && setLessons(data.updateLessons)
  }, [data])

  // alter gets called when someone clicks button to update a lesson
  const alter = async (options: any) => {
    const {
      title,
      description,
      docUrl,
      githubUrl,
      videoUrl,
      order,
      chatUrl
    } = options
    try {
      await alterLesson({
        variables: {
          id: parseInt(lesson.id),
          title,
          description,
          docUrl,
          githubUrl,
          videoUrl,
          order,
          chatUrl
        }
      })
    } catch (err) {
      throw new Error(err)
    }
  }
  const lessonInputs = { ...lesson }

  //delete unused properties
  delete lessonInputs.id
  delete lessonInputs['__typename']
  delete lessonInputs.challenges
  return (
    <React.Fragment>
      <StyledTitle>Lesson Info</StyledTitle>
      <div style={{ textAlign: 'center' }} className="card">
        <InputCard
          values={lessonInputs}
          buttons={{ 'Update Lesson': alter }}
          title={lesson.title}
        />
      </div>
    </React.Fragment>
  )
}

const getAttributes = (lesson: any) => {
  lesson.hasOwnProperty('challenges') && delete lesson.challenges
  lesson.hasOwnProperty('__typename') && delete lesson['__typename']
  const attributes = Object.keys(lesson)
  const res = attributes.reduce((acc: any, e: any) => {
    acc[e] = ''
    return acc
  }, {})
  return res
}

// Renders when someone clicks on `create new button` on the sidebar
const NewLesson: React.FC<NewLessonProps> = ({ lesson, setLessons }) => {
  const [createLesson, { loading, data }] = useMutation(createNewLesson)

  // when data is fully loaded after sending mutation request, update front-end lessons info
  useEffect(() => {
    !loading && data && setLessons(data.createLesson)
    console.log(data)
  }, [data])

  // alter gets called when someone clicks button to create a lesson
  const alter = async (options: any) => {
    let {
      title,
      description,
      docUrl,
      githubUrl,
      videoUrl,
      order,
      chatUrl
    } = options
    order = parseInt(order)
    try {
      await createLesson({
        variables: {
          title,
          description,
          docUrl,
          githubUrl,
          videoUrl,
          order,
          chatUrl
        }
      })
    } catch (err) {
      throw new Error(err)
    }
  }

  // makes a copy of `lesson` variable without values to pass into InputCard
  const attributes = getAttributes(lesson)

  return (
    <div style={{ textAlign: 'center', marginBottom: 20 }} className=" col-8">
      <StyledTitle>Create New Lesson</StyledTitle>
      <InputCard values={attributes} buttons={{ 'Create Lesson': alter }} />
    </div>
  )
}

const challengeAttributes = {
  title: '',
  description: '',
  order: '',
  id: ''
}

export const AdminLessonInfo: React.FC<LessonInfoProps> = ({
  setLessons,
  lessons,
  selectedLesson
}) => {
  const [newChallengeView, setNewChallengeView] = useState(false)

  // true when user clicks on `create new lesson` button
  if (selectedLesson === lessons.length) {
    return <NewLesson lesson={lessons[0]} setLessons={setLessons} />
  }

  // set currently selected lesson
  const lesson = lessons[selectedLesson]

  return (
    <div key={_.uniqueId()} style={{ textAlign: 'center' }} className="col-8">
      <div style={{ position: 'absolute', right: 0, top: 0 }}>
        <Button
          onClick={() => setNewChallengeView(!newChallengeView)}
          type="success"
        >
          {newChallengeView ? 'Back to Lesson Info' : 'Create New Challenge'}
        </Button>
      </div>
      {newChallengeView ? (
        <NewChallenge
          setLessons={setLessons}
          challenge={challengeAttributes}
          lessonId={parseInt(lesson.id)}
        />
      ) : (
        <React.Fragment>
          <LessonBase setLessons={setLessons} lesson={lesson} />
          <hr />
          <StyledTitle>Lesson Challenges</StyledTitle>
          <AdminLessonChallenges
            challenges={lesson.challenges}
            lessonId={parseInt(lesson.id)}
            setLessons={setLessons}
          />
        </React.Fragment>
      )}
    </div>
  )
}
