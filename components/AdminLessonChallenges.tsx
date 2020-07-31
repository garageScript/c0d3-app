import React, { useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks'
import updateChallenge from '../graphql/queries/updateChallenge'
import { FormCard } from './FormCard'
import createNewChallenge from '../graphql/queries/createChallenge'
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

//add error to here. for title, order and description
export const inputValues = (options: any, blank?: string) => {
  //if lessons are passed in, then challenges property must be deleted
  options.hasOwnProperty('challenges') && delete options['challenges']
  delete options['__typename']
  const keys = Object.keys(options)
  const res = keys.reduce((acc: any, type: any) => {
    const error =
      type === 'title' || type === 'order' || type === 'description'
        ? ['require']
        : []
    if (type === 'order') error.push('nums')
    acc.push({
      title: type,
      value: blank === '' ? '' : options[type],
      type: type === 'description' ? 'MD_INPUT' : 'TEXT_AREA',
      error
    })
    return acc
  }, [])
  return res
}

export const outputValues = (options: any) => {
  const res = options.reduce((acc: any, option: any) => {
    acc[option.title] = option.value
    return acc
  }, {})
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
    const { title, description, order } = outputValues(options)
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
      <span
        className="text-primary"
        style={{ fontSize: '4rem', textAlign: 'center', fontWeight: 'bold' }}
      >
        Create New Challenge
      </span>
      <div className="card">
        <FormCard
          onChange={() => {}}
          values={inputValues(challenge)}
          onSubmit={{ title: 'Create Challenge', onClick: alter }}
        />
      </div>
    </div>
  )
}

const renderChallenges = (challenges: any, alter: any) => {
  return challenges.map((challenge: Challenge, i: number) => (
    <div className="card" style={{ marginBottom: 20 }} key={i}>
      <FormCard
        onChange={() => {}}
        title={challenge.title}
        values={inputValues(challenge)}
        onSubmit={{ title: 'Update Challenge', onClick: alter }}
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
  const allChallenges = challenges ? renderChallenges(challenges, alter) : []

  return <>{allChallenges}</>
}
