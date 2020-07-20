import React, { useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks'
import createNewLesson from '../graphql/queries/createLesson'
import updateLesson from '../graphql/queries/updateLesson'
import updateChallenge from '../graphql/queries/updateChallenge'
import { StyledTitle } from './StyledTitle'
import { InputCard } from './InputCard'

type LessonInfoProps = {
  lessons: any
  setLessons: any
  selectedLesson: number
}

type LessonBaseProps = {
  setLessons: any
  lesson: any
}

const LessonBase: React.FC<LessonBaseProps> = ({ setLessons, lesson }) => {
  const [alterLesson, { loading, data }] = useMutation(updateLesson)

  useEffect(() => {
    !loading && data && setLessons(data.updateLessons)
  }, [data])

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
    } // catch error that's thrown by default from mutation
  }
  const lessonInputs = { ...lesson }
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

type LessonChallengesProps = {
  setLessons: any
  challenges: any
  lessonId?: number
}

const LessonChallenges: React.FC<LessonChallengesProps> = ({
  setLessons,
  challenges,
  lessonId
}) => {
  const [alterChallenge, { loading, data }] = useMutation(updateChallenge)

  useEffect(() => {
    !loading && data && setLessons(data.updateChallenge)
  }, [data])

  const alters = async (options: any) => {
    const { title, description, order, id } = options
    try {
      await alterChallenge({
        variables: {
          id: parseInt(id),
          lessonId,
          order,
          description,
          title
        }
      })
    } catch (err) {
      throw new Error(err)
    } // catch error that's thrown by default from mutation
  }
  let allChallenges = []
  if (challenges) {
    allChallenges = challenges.map((e: any, i: number) => {
      const challenge = { ...e }
      delete challenge['__typename']
      if (challenge.hasOwnProperty('lessonId')) delete challenge['lessonId']
      return (
        <div className="card" style={{ marginBottom: 20 }} key={i}>
          <InputCard
            title={e.title}
            values={challenge}
            buttons={{ 'Update Challenge': alters }}
          />
        </div>
      )
    })
  }
  return <React.Fragment>{allChallenges}</React.Fragment>
}

const getAttributes: any = (lesson: any) => {
  if (lesson.challenges) delete lesson.challenges
  if (lesson['__typename']) delete lesson['__typename']
  const attributes = Object.keys(lesson)
  const res = attributes.reduce((acc: any, e: any) => {
    acc[e] = ''
    return acc
  }, {})
  return res
}

type NewLessonProps = {
  lesson: any
  setLessons: any
}

const NewLesson: React.FC<NewLessonProps> = ({ lesson, setLessons }) => {
  if (!lesson) return <h1>ok</h1>
  const [createLesson, { loading, data }] = useMutation(createNewLesson)
  useEffect(() => {
    !loading && data && setLessons(data.createLesson)
    console.log(data)
  }, [data])

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
    } // catch error that's thrown by default from mutation
  }

  const attributes = getAttributes(lesson)

  return (
    <div
      style={{ textAlign: 'center', marginBottom: 20 }}
      className="col-8 card"
    >
      <StyledTitle>Create New Lesson</StyledTitle>
      <InputCard values={attributes} buttons={{ 'Create Lesson': alter }} />
    </div>
  )
}

export const AdminLessonsInfo: React.FC<LessonInfoProps> = ({
  setLessons,
  lessons,
  selectedLesson
}) => {
  if (selectedLesson === lessons.length) {
    return <NewLesson lesson={lessons[0]} setLessons={setLessons} />
  }
  const lesson = lessons[selectedLesson]
  return (
    <div style={{ textAlign: 'center' }} className="col-8">
      <LessonBase setLessons={setLessons} lesson={lesson} />
      <hr />
      <StyledTitle>Lesson Challenges</StyledTitle>
      <LessonChallenges
        challenges={lesson.challenges}
        lessonId={parseInt(lesson.id)}
        setLessons={setLessons}
      />
    </div>
  )
}
