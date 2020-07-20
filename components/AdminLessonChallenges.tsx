import React, { useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks'
import updateChallenge from '../graphql/queries/updateChallenge'
import { InputCard } from './InputCard'
import _ from 'lodash'
import createNewChallenge from '../graphql/queries/createChallenge'
import { StyledTitle } from './StyledTitle'

// order is a string when someone is making a new challenge.
// The attributes passed in are all strings to be passed into InputCard component
type Challenge = {
  title: string
  id?: string
  order: number | string
  description: string
}

type NewChallengeProps = {
  challenge: Challenge
  setLessons: React.Dispatch<React.SetStateAction<null>>
  lessonId: number
}
type LessonChallengesProps = {
  setLessons: React.Dispatch<React.SetStateAction<null>>
  challenges: Challenge[]
  lessonId?: number
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
        <InputCard values={challenge} buttons={{ 'Create Challenge': alter }} />
      </div>
    </div>
  )
}

const renderChallenges = (challenges: any, alter: any) => {
  const allChallenges = challenges.map((e: any, i: number) => {
    const challenge = { ...e }
    // delete unused properties
    challenge.hasOwnProperty('__typename') && delete challenge['__typename']
    challenge.hasOwnProperty('lessonId') && delete challenge['lessonId']
    return (
      <div className="card" style={{ marginBottom: 20 }} key={i}>
        <InputCard
          title={e.title}
          values={challenge}
          buttons={{ 'Update Challenge': alter }}
        />
      </div>
    )
  })
  return allChallenges
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
          order,
          description,
          title
        }
      })
    } catch (err) {
      throw new Error(err)
    }
  }
  const allChallenges = challenges ? renderChallenges(challenges, alter) : []

  return <React.Fragment>{allChallenges}</React.Fragment>
}
