import { get, toUpper } from 'lodash'
import Link from 'next/link'
import React, { useState } from 'react'
import { Collapse, Spinner } from 'react-bootstrap'
import { PROFILE_PATH } from '../../../constants'
import {
  useDeleteExerciseMutation,
  useRemoveExerciseFlagMutation,
  Exercise,
  User
} from '../../../graphql'
import styles from '../../../scss/adminLessonExerciseCard.module.scss'
import CopyButton from '../../CopyButton'

type NarrowedUser = Pick<User, 'discordId' | 'email' | 'username'>
type NarrowedExercise = Omit<Exercise, 'author' | 'module'> & {
  author: NarrowedUser
  module: {
    name: string
  }
}

type HeaderProps = { user: NarrowedUser; exercise: NarrowedExercise }
const Header = ({ user, exercise }: HeaderProps) => {
  return (
    <div className={styles.card__header}>
      <div className={styles.card__badges}>
        {exercise.flaggedAt && (
          <span
            className={`${styles.card__header__badge} ${styles.card__header__badge__flagged}`}
          >
            FLAGGED
          </span>
        )}
        <span
          className={`${styles.card__header__badge} ${styles.card__header__badge__module}`}
        >
          {toUpper(exercise.module.name)}
        </span>
      </div>
      <Link href={`${PROFILE_PATH}/${user.username}`}>
        <a className={styles.card__header__username}>@{user.username}</a>
      </Link>
      <div className={styles.card__header__contact__container}>
        <div className={styles.card__header__contact}>
          <span>Email</span>
          <CopyButton value={user.email} color={'primary'} />
        </div>
        <div className={styles.card__header__contact}>
          <span>Discord</span>
          <CopyButton value={`<@${user.discordId}>`} color={'primary'} />
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
            onClick={() => setShow(prev => !prev)}
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
  exercise: NarrowedExercise
  onRemove?: (id: number) => void
  onUnflag?: (id: number) => void
}
const Footer = ({ exercise, onRemove, onUnflag }: FooterProps) => {
  const [deleteExercise, { loading: deleteLoading }] =
    useDeleteExerciseMutation()
  const [unflagExercise, { loading: unflagLoading }] =
    useRemoveExerciseFlagMutation()

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
        id: exercise.id
      }
    })

    if (onUnflag) {
      const unFlaggedExerciseData = get(
        unflaggedExercise,
        'data.removeExerciseFlag'
      )

      onUnflag(unFlaggedExerciseData)
    }
  }

  return (
    <div className={styles.card__footer}>
      <button
        className={`${styles.card__footer__btn} ${styles.card__footer__btn__unflag}`}
        onClick={handleUnflag}
      >
        {unflagLoading ? (
          <Spinner size="sm" animation="border" />
        ) : (
          <span>UNFLAG EXERCISE</span>
        )}
      </button>
      <button
        className={`${styles.card__footer__btn} ${styles.card__footer__btn__remove}`}
        disabled={deleteLoading}
        onClick={handleRemove}
      >
        {deleteLoading ? (
          <Spinner size="sm" animation="border" />
        ) : (
          <span>REMOVE EXERCISE</span>
        )}
      </button>
    </div>
  )
}

type Props = {
  user: NarrowedUser
  exercise: NarrowedExercise
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
