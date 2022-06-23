import { get } from 'lodash'
import React, { useState } from 'react'
import { Collapse, Spinner } from 'react-bootstrap'
import {
  Exercise,
  useDeleteExerciseMutation,
  User,
  useUpdateExerciseMutation
} from '../../../graphql'
import styles from '../../../scss/adminLessonExerciseCard.module.scss'

type HeaderProps = { user: User; exercise: Exercise }
const Header = ({ user, exercise }: HeaderProps) => {
  return (
    <div className={styles.card__header}>
      <div>
        <span>{exercise.module.name}</span>
      </div>
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
  explanation?: string
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

type FooterProps = {
  exercise: Exercise
  onRemove?: (id: number) => void
  onUnflag?: (id: number) => void
}
const Footer = ({ exercise, onRemove, onUnflag }: FooterProps) => {
  const [deleteExercise, { loading: deleteLoading }] =
    useDeleteExerciseMutation()
  const [unflagExercise, { loading: unflagLoading }] =
    useUpdateExerciseMutation()

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

  const handleUnflag = async () => {
    const unflaggedExercise = await unflagExercise({
      variables: {
        id: exercise.id,
        moduleId: exercise.module.id,
        description: exercise.description,
        answer: exercise.answer,
        flaggedAt: null
      }
    })

    if (onUnflag) {
      const unFlaggedExerciseData = get(
        unflaggedExercise,
        'data.unflagExercise'
      )

      onUnflag(unFlaggedExerciseData)
    }
  }

  return (
    <div className={styles.card__footer}>
      <button
        className={styles.card__footer__btn}
        disabled={deleteLoading}
        onClick={handleRemove}
      >
        {deleteLoading ? (
          <Spinner size="sm" animation="border" />
        ) : (
          <span>REMOVE EXERCISE</span>
        )}
      </button>
      <button className={styles.card__footer__btn} onClick={handleUnflag}>
        {unflagLoading ? (
          <Spinner size="sm" animation="border" />
        ) : (
          <span>UNFLAG EXERCISE</span>
        )}
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
      <Header user={user} exercise={exercise} />
      <Section header="Description" paragraph={exercise.description} />
      <Section
        header="Answer"
        paragraph={exercise.answer}
        explanation={exercise.explanation || ''}
      />
      <Section header="Reason for flag" paragraph={exercise.flagReason!} />
      <Footer exercise={exercise} onRemove={onRemove} onUnflag={onUnflag} />
    </div>
  )
}

export default ExerciseCard
