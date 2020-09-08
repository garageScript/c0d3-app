import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import updateChallenge from '../../../graphql/queries/updateChallenge'
import { FormCard } from '../../FormCard'
import createNewChallenge from '../../../graphql/queries/createChallenge'
import { Lesson, Challenge, Maybe } from '../../../graphql/index'
import {
  getPropertyArr,
  makeGraphqlVariable,
  errorCheckAllFields,
  errorCheckSingleField
} from '../../../helpers/admin/lessonHelpers'
import { lessonSchema } from '../../../helpers/formValidation'

const challengeAttributes = {
  title: '',
  description: '',
  order: ''
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
    const valid = await errorCheckAllFields(newProperties, lessonSchema)
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
      throw new Error(err)
    }
  }

  const handleChange = async (value: string, propertyIndex: number) => {
    const newChallengeProperties = [...challengeProperties]
    newChallengeProperties[propertyIndex].value = value
    await errorCheckSingleField(
      newChallengeProperties,
      propertyIndex,
      lessonSchema
    )
    setChallengeProperties(newChallengeProperties)
  }

  return (
    <div className="mb-2">
      <div className="mb-3 text-center">
        <span className="text-primary font-weight-bold display-3">
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
    getPropertyArr(challenge, ['lessonId'])
  )

  const handleChange = async (value: string, propertyIndex: number) => {
    const newChallengeProperties = [...challengeProperties]
    newChallengeProperties[propertyIndex].value = value
    await errorCheckSingleField(
      newChallengeProperties,
      propertyIndex,
      lessonSchema
    )
    setChallengeProperties(newChallengeProperties)
  }

  const handleSubmit = {
    title: 'Update Challenge',
    onClick: async () => {
      const newProperties = [...challengeProperties]
      const valid = await errorCheckAllFields(newProperties, lessonSchema)
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
