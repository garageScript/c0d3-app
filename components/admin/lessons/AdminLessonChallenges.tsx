import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import _ from 'lodash'
import updateChallenge from '../../../graphql/queries/updateChallenge'
import { FormCard } from '../../FormCard'
import createNewChallenge from '../../../graphql/queries/createChallenge'
import { Lesson, Challenge } from '../../../graphql/index'
import {
  inputValues,
  outputValues,
  checkForErrors,
  checkForAllErrors
} from '../../../helpers/admin/lessonHelpers'

const challengeAttributes = {
  title: '',
  order: '',
  description: '',
  id: ''
}

type OneChallengeProps = {
  challenge: Challenge
  alter: (options: any) => Promise<void>
}

type NewChallengeProps = {
  // challenge: Challenge
  setLessons: React.Dispatch<React.SetStateAction<Lesson[] | null>>
  lessonId: number
}
type LessonChallengesProps = {
  setLessons: React.Dispatch<React.SetStateAction<Lesson[] | null>>
  challenges?: any
  lessonId?: number
}

// Renders when someone clicks on `create new button` on the sidebar
export const NewChallenge: React.FC<NewChallengeProps> = ({
  // challenge,
  setLessons,
  lessonId
}) => {
  const [createChallenge, { loading, data }] = useMutation(createNewChallenge)
  const [challengeInfo, setChallengeInfo] = useState(
    inputValues(challengeAttributes)
  )
  // when data is fully loaded after sending mutation request, update front-end lessons info
  useEffect(() => {
    !loading && data && setLessons(data.createChallenge)
  }, [data])

  // alter gets called when someone clicks button to create a lesson
  const alter = async () => {
    const newOptions = [challengeInfo]
    const errors = checkForAllErrors(newOptions)
    if (errors) {
      setChallengeInfo(newOptions)
      return
    }
    const { title, description, order } = outputValues(challengeInfo)
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
  const handleChange = (value: string, i: number) => {
    const newChallengeInfo = [...challengeInfo]
    newChallengeInfo[i].value = value
    checkForErrors(newChallengeInfo[i])
    setChallengeInfo(newChallengeInfo)
  }

  return (
    <div style={{ textAlign: 'center', marginBottom: 20, marginTop: 10 }}>
      <span
        className="text-primary"
        style={{ fontSize: '4rem', textAlign: 'center', fontWeight: 'bold' }}
      >
        Create New Challenge
      </span>
      <div className="card">
        <FormCard
          onChange={handleChange}
          values={challengeInfo}
          onSubmit={{ title: 'Create Challenge', onClick: alter }}
        />
      </div>
    </div>
  )
}

const OneChallenge: React.FC<OneChallengeProps> = ({ challenge, alter }) => {
  const [challengeInfo, setChallengeInfo] = useState(inputValues(challenge))

  const handleChange = (value: string, i: number) => {
    const newChallengeInfo = [...challengeInfo]
    newChallengeInfo[i].value = value
    checkForErrors(newChallengeInfo[i])
    setChallengeInfo(newChallengeInfo)
  }

  const handleSubmit = {
    title: 'Update Challenge',
    onClick: () => {
      const newOptions = [...challengeInfo]
      const errors = checkForAllErrors(newOptions)
      if (errors) {
        setChallengeInfo(newOptions)
        return
      }
      alter(challengeInfo)
    }
  }

  return (
    <div className="card" style={{ marginBottom: 20 }}>
      <FormCard
        onChange={handleChange}
        title={challenge.title + '' || ''}
        values={challengeInfo}
        onSubmit={handleSubmit}
      />
    </div>
  )
}

const challengesList = (challenges: any, alter: any) => {
  return challenges.map((challenge: Challenge, i: number) => (
    <OneChallenge challenge={challenge} alter={alter} key={i} />
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
    const { title, description, order, id } = outputValues(options)
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
  const allChallenges = !challenges ? [] : challengesList(challenges, alter)

  return <>{allChallenges}</>
}
