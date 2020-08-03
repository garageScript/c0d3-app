import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import _ from 'lodash'
import updateChallenge from '../../../graphql/queries/updateChallenge'
import { FormCard } from '../../FormCard'
import createNewChallenge from '../../../graphql/queries/createChallenge'
import { Lesson, Challenge, Maybe } from '../../../graphql/index'
import {
  getPropertyArr,
  checkForErrors,
  checkForAllErrors,
  makeGraphqlVariable
} from '../../../helpers/admin/lessonHelpers'
import { titleStyle } from './AdminLessonInfo'

const challengeAttributes = {
  title: '',
  order: '',
  description: '',
  id: ''
}

type LessonChallengeProps = {
  challenge: Maybe<Challenge>
  alter: (options: any) => Promise<void>
}

type NewChallengeProps = {
  setLessons: React.Dispatch<React.SetStateAction<Lesson[] | null>>
  lessonId: number
}
type LessonChallengesProps = {
  setLessons: React.Dispatch<React.SetStateAction<Lesson[] | null>>
  challenges: Maybe<Challenge>[] | null | undefined
  lessonId?: number
}

// Renders when someone clicks on `create new button` on the sidebar
export const NewChallenge: React.FC<NewChallengeProps> = ({
  // challenge,
  setLessons,
  lessonId
}) => {
  const [createChallenge, { loading, data }] = useMutation(createNewChallenge)
  const [challengeProperties, setChallengeProperties] = useState(
    getPropertyArr(challengeAttributes)
  )
  // when data is fully loaded after sending mutation request, update front-end lessons info
  useEffect(() => {
    !loading && data && setLessons(data.createChallenge)
  }, [data])

  // alter gets called when someone clicks button to create a lesson
  const alter = async () => {
    const newProperties = [...challengeProperties]
    const errors = checkForAllErrors(newProperties)
    if (errors) {
      setChallengeProperties(newProperties)
      return
    }
    try {
      await createChallenge(
        makeGraphqlVariable(challengeProperties, { lessonId })
      )
      window.location.reload()
    } catch (err) {
      throw new Error(err)
    }
  }

  const handleChange = (value: string, propertyIndex: number) => {
    const newChallengeProperties = [...challengeProperties]
    newChallengeProperties[propertyIndex].value = value
    checkForErrors(newChallengeProperties[propertyIndex])
    setChallengeProperties(newChallengeProperties)
  }

  return (
    <div style={{ textAlign: 'center', marginBottom: 20, marginTop: 10 }}>
      <span className="text-primary" style={titleStyle}>
        Create New Challenge
      </span>
      <div className="card">
        <FormCard
          onChange={handleChange}
          values={challengeProperties}
          onSubmit={{ title: 'Create Challenge', onClick: alter }}
        />
      </div>
    </div>
  )
}

const LessonChallenge: React.FC<LessonChallengeProps> = ({
  challenge,
  alter
}) => {
  const [challengeProperties, setChallengeProperties] = useState(
    getPropertyArr(challenge, ['lessonId'])
  )

  const handleChange = (value: string, propertyIndex: number) => {
    const newChallengeProperties = [...challengeProperties]
    newChallengeProperties[propertyIndex].value = value
    checkForErrors(newChallengeProperties[propertyIndex])
    setChallengeProperties(newChallengeProperties)
  }

  const handleSubmit = {
    title: 'Update Challenge',
    onClick: () => {
      const newProperties = [...challengeProperties]
      const errors = checkForAllErrors(newProperties)
      if (errors) {
        setChallengeProperties(newProperties)
        return
      }
      alter(challengeProperties)
    }
  }

  return (
    <div className="card" style={{ marginBottom: 20 }}>
      <FormCard
        onChange={handleChange}
        title={(challenge && challenge.title + '') || ''}
        values={challengeProperties}
        onSubmit={handleSubmit}
      />
    </div>
  )
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
    try {
      await alterChallenge(makeGraphqlVariable(options, { lessonId }))
      window.location.reload()
    } catch (err) {
      throw new Error(err)
    }
  }
  const allChallenges = !challenges
    ? []
    : challenges.map((challenge: Maybe<Challenge>, key: number) => (
        <LessonChallenge challenge={challenge} alter={alter} key={key} />
      ))

  return <>{allChallenges}</>
}
