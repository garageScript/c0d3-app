import React, { useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks'
import updateChallenge from '../graphql/queries/updateChallenge'
import { InputCard } from './InputCard'
import createNewChallenge from '../graphql/queries/createChallenge'
import { StyledTitle } from './StyledTitle'
import { Lesson } from '../@types/adminLesson'

type Challenge = {
  title: string
  id?: string
  order: number | string
  description: string
}

type NewChallengeProps = {
  challenge: Challenge
  setLessons: React.Dispatch<React.SetStateAction<Lesson[] | null>>
  lessonId: number
}
type LessonChallengesProps = {
  setLessons: React.Dispatch<React.SetStateAction<Lesson[] | null>>
  challenges: Challenge[]
  lessonId?: number
}

export const inputValues = (lesson: any, blank?: string) => {
  lesson.hasOwnProperty('challenges') && delete lesson['challenges']
  delete lesson['__typename']
  const fck = Object.keys(lesson)
  const res = fck.reduce((acc: any, type: any) => {
    acc.push({
      title: type,
      value: blank === '' ? '' : lesson[type]
    })
    return acc
  }, [])
  return res
}

// Renders when someone clicks on `create new button` on the sidebar
export const NewChallenge: React.FC<NewChallengeProps> = ({
  challenge,
  setLessons,
  lessonId
}) => {
  const [createChallenge, { loading, data }] = useMutation(createNewChallenge)

  // when data is fully loaded after sending mutation request, update front-end lessons info
  useEffect(() => {
    !loading && data && setLessons(data.createChallenge)
    console.log(data)
  }, [data])

  // alter gets called when someone clicks button to create a lesson
  const alter = async (options: any) => {
    const { title, description, order } = options
    try {
      await createChallenge({
        variables: {
          title,
          description,
          order: parseInt(order),
          lessonId
        }
      })
    } catch (err) {
      throw new Error(err)
    }
  }

  return (
    <div style={{ textAlign: 'center', marginBottom: 20, marginTop: 10 }}>
      <StyledTitle>Create New Challenge</StyledTitle>
      <div className="card">
        <InputCard
          values={inputValues(challenge)}
          buttons={[{ title: 'Create Challenge', onClick: alter }]}
        />
      </div>
    </div>
  )
}

const renderChallenges = (challenges: any, alter: any) => {
  return challenges.map((challenge: Challenge, i: number) => (
    <div className="card" style={{ marginBottom: 20 }} key={i}>
      <InputCard
        title={challenge.title}
        values={inputValues(challenge)}
        buttons={[{ title: 'Update Challenge', onClick: alter }]}
      />
    </div>
  ))
}

// creates list of cards to update challenges
export const AdminLessonChallenges: React.FC<LessonChallengesProps> = ({
  setLessons,
  challenges,
  lessonId
}) => {
  const [alterChallenge, { loading, data }] = useMutation(updateChallenge)

  // when data is fully loaded after sending mutation request, update front-end lessons info
  useEffect(() => {
    !loading && data && setLessons(data.updateChallenge)
  }, [data])

  // alter gets called when someone clicks button to update a challenge
  const alter = async (options: any) => {
    const { title, description, order, id } = options
    try {
      await alterChallenge({
        variables: {
          id: parseInt(id),
          lessonId,
          order: parseInt(order),
          description,
          title
        }
      })
    } catch (err) {
      throw new Error(err)
    }
  }
  const allChallenges = challenges ? renderChallenges(challenges, alter) : []

  return <>{allChallenges}</>
}
