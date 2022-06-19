import { gql, useMutation } from '@apollo/client'
import { get } from 'lodash'
import React, { useState } from 'react'
import { Collapse, Spinner } from 'react-bootstrap'
import { Exercise, Maybe, User } from '../../../graphql'
import styles from '../../../scss/adminLessonExerciseCard.module.scss'

type HeaderProps = { user: User }

const Header = ({ user }: HeaderProps) => {
  return (
    <div className={styles.card__header}>
      <p className={styles.card__header__username}>{user.username}</p>
      <div className={styles.card__header__contact__container}>
        <div className={styles.card__header__contact}>
          <span>{user.email}</span>
        </div>
        <div className={styles.card__header__contact}>
          <span>{user.discordUsername}</span>
        </div>
      </div>
    </div>
  )
}

type SectionProps = {
  header: string
  paragraph: string
  explanation?: Maybe<string>
}

const Section = ({ header, paragraph, explanation }: SectionProps) => {
  const [show, setShow] = useState(false)

  return (
    <div className={styles.card__section}>
      <h3 className={styles.card__section__header}>{header}</h3>
      <p className={styles.card__section__desc}>{paragraph}</p>
      {explanation && (
        <>
          <button
            className={styles['card__section--explanation']}
            onClick={() => setShow(!show)}
          >
            {show ? 'Hide' : 'Show'} explanation
          </button>
          <Collapse in={show}>
            <div
              id="explanation-collapse-text"
              className={styles.card__section__explanation}
            >
              {explanation}
            </div>
          </Collapse>
        </>
      )}
    </div>
  )
}

const DELETE_EXERCISE = gql`
  mutation deleteExercise($id: Int!) {
    deleteExercise(id: $id) {
      id
    }
  }
`

type FooterProps = {
  exercise: Exercise
  onRemove?: (id: number) => void
  onUnflag?: (id: number) => void
}

const Footer = ({ exercise, onRemove }: FooterProps) => {
  const [deleteExercise, { loading }] = useMutation(DELETE_EXERCISE)

  const handleRemove = async () => {
    const deletedExercise = await deleteExercise({
      variables: {
        id: exercise.id
      }
    })

    if (onRemove) {
      const deletedExerciseData = get(deletedExercise, 'data.deletedExercise')
      onRemove(deletedExerciseData)
    }
  }

  return (
    <div className={styles.card__footer}>
      <button
        className={styles.card__footer__btn}
        disabled={loading}
        onClick={handleRemove}
      >
        {loading ? (
          <Spinner size="sm" animation="border" />
        ) : (
          <span>REMOVE EXERCISE</span>
        )}
      </button>
      <button className={styles.card__footer__btn} disabled>
        <span>UNFLAG EXERCISE</span>
      </button>
    </div>
  )
}

type Props = {
  user: User
  exercise: Exercise
  onRemove?: (id: number) => void
  onUnflag?: (id: number) => void
}

const ExerciseCard = ({ user, exercise, onRemove, onUnflag }: Props) => {
  return (
    <div className={styles.card}>
      <Header user={user} />
      <Section header="Description" paragraph={exercise.description} />
      <Section
        header="Answer"
        paragraph={exercise.answer}
        explanation={exercise.explanation}
      />
      <Section
        header="Reason for flag"
        paragraph={get(exercise, 'flagReason')}
      />
      <Footer exercise={exercise} onRemove={onRemove} onUnflag={onUnflag} />
    </div>
  )
}

export default ExerciseCard
