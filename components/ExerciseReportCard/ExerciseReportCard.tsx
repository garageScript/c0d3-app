import { ApolloError } from '@apollo/client'
import React, { useState } from 'react'
import { DISCORD_PATH } from '../../constants'
import { FlagExerciseMutation, useFlagExerciseMutation } from '../../graphql'
import styles from './exerciseReportCard.module.scss'
import { MdInput } from '../MdInput'
import NavLink from '../NavLink'
import QueryInfo from '../QueryInfo'
import { Button } from '../theme/Button'

type BodyProps = {
  description: string
  loading: boolean
  data?: null | FlagExerciseMutation
  error?: ApolloError
  setDescription: (str: string) => void
  flagExercise: () => void
  setReportMode: (mode: boolean) => void
}

const Body = ({
  description,
  loading,
  error,
  data,
  setDescription,
  flagExercise,
  setReportMode
}: BodyProps) => (
  <div className={styles.container}>
    <h5>Report a mistake in this exercise</h5>
    <p>Remember to double check your answer. Thanks for your help!</p>
    <p>
      Alternatively, you can{' '}
      <NavLink hoverUnderline path={DISCORD_PATH}>
        report any technical problems
      </NavLink>{' '}
      you might be experiencing.
    </p>
    <label htmlFor="description" className="mb-2">
      Description of issue:
    </label>
    <MdInput
      onChange={(v: string) => setDescription(v)}
      value={description}
      placeHolder="Describe the mistake here..."
    />
    <div className={styles.container__btns__container}>
      {loading || error ? (
        <QueryInfo
          data={data}
          loading={loading}
          error={error?.message || ''}
          texts={{
            loading: 'Submitting the issue...',
            data: 'Thanks for reporting!',
            error: 'Oops, something went wrong.'
          }}
        />
      ) : (
        <>
          <Button
            border
            outline
            btnType="info"
            color="info"
            onClick={() => flagExercise()}
          >
            Submit issue
          </Button>
          <Button
            outline
            btnType="info"
            color="info"
            onClick={() => setReportMode(false)}
          >
            Cancel
          </Button>
        </>
      )}
    </div>
  </div>
)

type Props = {
  exerciseId: number
  answerShown: boolean
}

const ExerciseReportCard = ({ exerciseId, answerShown }: Props) => {
  const [reportMode, setReportMode] = useState(false)
  const [description, setDescription] = useState('')
  const [flagExercise, { data, loading, error }] = useFlagExerciseMutation({
    variables: {
      id: exerciseId,
      flagReason: description
    }
  })

  const marginOnExpand = answerShown ? 'mt-5' : ''

  if (data && !loading) {
    return (
      <div className={`${styles.container} ${marginOnExpand}`}>
        <h6>Reported a mistake in this exercise</h6>
        <p className="mb-0">
          We appreciate your input. We will shortly investigate the problem that
          has been reported.
        </p>
      </div>
    )
  }

  return (
    <div className={marginOnExpand}>
      {reportMode ? (
        <Body
          data={data}
          loading={loading}
          error={error}
          description={description}
          setDescription={setDescription}
          flagExercise={flagExercise}
          setReportMode={setReportMode}
        />
      ) : (
        <button
          className={styles.container__reportBtn}
          onClick={() => setReportMode(true)}
        >
          Report a problem
        </button>
      )}
    </div>
  )
}

export default ExerciseReportCard