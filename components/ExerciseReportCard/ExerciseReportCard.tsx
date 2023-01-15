import { ApolloError } from '@apollo/client'
import React, { useState } from 'react'
import { DISCORD_PATH } from '../../constants'
import { FlagExerciseMutation, useFlagExerciseMutation } from '../../graphql'
import styles from './exerciseReportCard.module.scss'
import { MdInput } from '../MdInput'
import NavLink from '../NavLink'
import QueryInfo from '../QueryInfo'
import { Button } from '../theme/Button'
import btnStyles from '../../scss/button.module.scss'

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
            btnType="mute"
            color="mute"
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
  flaggedAt: boolean
}

const ExerciseReportCard = ({ exerciseId, flaggedAt }: Props) => {
  const [reportMode, setReportMode] = useState(false)
  const [description, setDescription] = useState('')
  const [flagExercise, { data, loading, error }] = useFlagExerciseMutation({
    variables: {
      id: exerciseId,
      flagReason: description
    }
  })

  if (data && !loading) {
    return (
      <div className={`${styles.container} mt-3`}>
        <h6>Reported a mistake in this exercise</h6>
        <p className="mb-0">
          We appreciate your input. We will shortly investigate the problem that
          has been reported.
        </p>
      </div>
    )
  }

  console.log(reportMode, flaggedAt)

  if (reportMode && flaggedAt) {
    return (
      <div className={`${styles.container} mt-3`}>
        <h6>The exercise has already been reported</h6>
        <p className="mb-0">
          We appreciate your concern. The exercise has already been reported and
          we are investigating the problem that has been reported.
        </p>
      </div>
    )
  }

  return (
    <div>
      {reportMode ? (
        <>
          <hr />
          <Body
            data={data}
            loading={loading}
            error={error}
            description={description}
            setDescription={setDescription}
            flagExercise={flagExercise}
            setReportMode={setReportMode}
          />
        </>
      ) : (
        <Button
          className={`${btnStyles.newButton} ${styles.container__reportBtn}`}
          onClick={() => setReportMode(true)}
          outline
          color="mute"
        >
          Report a problem
        </Button>
      )}
    </div>
  )
}

export default ExerciseReportCard
