import { useMutation } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import updateChallenge from '../../../graphql/queries/updateChallenge'
import { FormCard } from '../../FormCard'
import * as Sentry from '@sentry/browser'
import createNewChallenge from '../../../graphql/queries/createChallenge'
import { Lesson, Challenge, Maybe } from '../../../graphql/index'
import {
  getPropertyArr,
  makeGraphqlVariable,
  errorCheckAllFields
} from '../../../helpers/admin/adminHelpers'
import { challengeSchema } from '../../../helpers/formValidation'
import { formChange } from '../../../helpers/formChange'

const challengeAttributes = {
  title: '',
  description: '',
  order: ''
}

type LessonChallengeProps = {
  challenge: Challenge
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
    const valid = await errorCheckAllFields(newProperties, challengeSchema)
    if (!valid) {
      setChallengeProperties(newProperties)
      return
    }

    try {
      await createChallenge(
        makeGraphqlVariable(challengeProperties, { lessonId })
      )

      window.location.reload()
    } catch (err) {
      Sentry.captureException(err)
    }
  }

  const handleChange = async (value: string, propertyIndex: number) => {
    await formChange(
      value,
      propertyIndex,
      challengeProperties,
      setChallengeProperties,
      challengeSchema
    )
  }

  return (
    <div className="mb-2">
      <div className="mb-3 text-center">
        <span className="text-primary fw-bold display-3">
          Create New Challenge
        </span>
      </div>

      <FormCard
        onChange={handleChange}
        values={challengeProperties}
        onSubmit={{ title: 'Create Challenge', onClick: alter }}
      />
    </div>
  )
}

const LessonChallenge: React.FC<LessonChallengeProps> = ({
  challenge,
  alter
}) => {
  const [challengeProperties, setChallengeProperties] = useState(
    getPropertyArr(challenge, ['lessonId', '__typename'])
  )

  const handleChange = async (value: string, propertyIndex: number) => {
    await formChange(
      value,
      propertyIndex,
      challengeProperties,
      setChallengeProperties,
      challengeSchema
    )
  }

  const handleSubmit = {
    title: 'Update Challenge',
    onClick: async () => {
      const newProperties = [...challengeProperties]
      const valid = await errorCheckAllFields(newProperties, challengeSchema)
      if (!valid) {
        setChallengeProperties(newProperties)
        return
      }
      alter(challengeProperties)
    }
  }

  return (
    <div className="mt-3">
      <FormCard
        onChange={handleChange}
        title={challenge.title ? challenge.title : ''}
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
      Sentry.captureException(err)
    }
  }
  const allChallenges = !challenges
    ? []
    : challenges.map((challenge: Maybe<Challenge>, key: number) => {
        if (challenge !== null) {
          return (
            <LessonChallenge
              challenge={challenge as Challenge}
              alter={alter}
              key={key}
            />
          )
        }
      })
  return <>{allChallenges}</>
}
