import React, { useEffect, useState } from 'react'
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
  options.hasOwnProperty('lessonId') && delete options.lessonId
  options.hasOwnProperty('challenges') && delete options['challenges']
  delete options['__typename']
  const keys = Object.keys(options)
  const res = keys.reduce((acc: any, type: any) => {
    acc.push({
      title: type,
      value: blank === '' ? '' : options[type],
      type: type === 'description' ? 'MD_INPUT' : 'TEXT_AREA'
    })
    return acc
  }, [])
  return res
}

//have to check for errors in here
export const outputValues = (options: any) => {
  const res = options.reduce((acc: any, option: any) => {
    acc[option.title] = option.value
    return acc
  }, {})
  return res
}

export const checkForErrors = (newChallengeInfo: {
  title: string
  value: string
  error: string
  hasOwnProperty: (arg0: string) => any
}) => {
  let errorSeen = false
  let { title, value } = newChallengeInfo
  value += ''
  if (title === 'order') {
    if (!value) {
      newChallengeInfo.error = 'Required'
      errorSeen = true
    } else if (!value.match(/^[0-9]+$/)) {
      newChallengeInfo.error = 'Numbers only'
      errorSeen = true
    } else {
      if (newChallengeInfo.hasOwnProperty('error')) {
        delete newChallengeInfo.error
      }
    }
  }
  if (title === 'title' || title === 'description') {
    if (!value) {
      newChallengeInfo.error = 'Required'
      errorSeen = true
    } else {
      if (newChallengeInfo.hasOwnProperty('error')) {
        delete newChallengeInfo.error
      }
    }
  }
  return errorSeen
}

export const checkForAllErrors = (options: any) => {
  let error = false
  options.forEach((option: any) => {
    if (checkForErrors(option)) error = true
  })
  return error
}

// Renders when someone clicks on `create new button` on the sidebar
export const NewChallenge: React.FC<NewChallengeProps> = ({
  challenge,
  setLessons,
  lessonId
}) => {
  const [createChallenge, { loading, data }] = useMutation(createNewChallenge)
  const [challengeInfo, setChallengeInfo] = useState(
    inputValues({ ...challenge }, '')
  )
  // when data is fully loaded after sending mutation request, update front-end lessons info
  useEffect(() => {
    !loading && data && setLessons(data.createChallenge)
  }, [data])

  // alter gets called when someone clicks button to create a lesson
  const alter = async (options: any) => {
    const newOptions = [...options]
    const errors = checkForAllErrors(newOptions)
    if (errors) {
      setChallengeInfo(newOptions)
      return
    }
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
  console.log('options', challengeInfo)
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

type OneChallengeProps = {
  challenge: any
  alter: any
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
    onClick: (options: any) => {
      const newOptions = [...options]
      const errors = checkForAllErrors(newOptions)
      if (errors) {
        setChallengeInfo(newOptions)
        return
      }
      alter(options)
    }
  }

  return (
    <div className="card" style={{ marginBottom: 20 }}>
      <FormCard
        onChange={handleChange}
        title={challenge.title}
        values={challengeInfo}
        onSubmit={handleSubmit}
      />
    </div>
  )
}

const renderChallenges = (challenges: any, alter: any) => {
  return challenges.map((challenge: Challenge, i: number) => {
    return <OneChallenge challenge={challenge} alter={alter} key={i} />
  })
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
