import React, { useState } from 'react'
import { NewButton } from '../theme/Button'
import { Text } from '../theme/Text'
import styles from './exerciseCard.module.scss'

export type ExerciseCardProps = {
  problem: string
  answer: string
  explanation: string
  answerShown: boolean
  setAnswerShown: (answerShown: boolean) => void
  messageKey: MessageKey
  setMessageKey: (messageKey: MessageKey) => void
}

enum Message {
  EMPTY = '',
  ERROR = 'Your answer is incorrect - please try again.',
  SUCCESS = '🎉 Your answer is correct!'
}

export type MessageKey = keyof typeof Message

const ExerciseCard = ({
  problem,
  answer,
  explanation,
  answerShown,
  setAnswerShown,
  messageKey,
  setMessageKey
}: ExerciseCardProps) => {
  const [studentAnswer, setStudentAnswer] = useState('')
  const message = Message[messageKey]

  return (
    <section className="card p-5 border-0 shadow">
      <div className="d-flex flex-column flex-md-row mb-2">
        <div className={`mb-0 me-md-3 ${styles.exerciseCard__section}`}>
          <div className="fw-bold mb-2">Problem</div>
          <pre className="bg-light py-3 px-4">{problem}</pre>
        </div>
        <div className={`ms-md-3 ${styles.exerciseCard__section}`}>
          <div className="fw-bold mt-2 mt-md-0 mb-2">Your Answer</div>
          <input
            aria-label="User answer"
            className={`form-control mb-2 ${
              messageKey === 'ERROR' ? styles.exerciseCard__input__error : ''
            }`}
            value={studentAnswer}
            onChange={e => setStudentAnswer(e.target.value)}
          />
          <div
            className={`${styles.exerciseCard__message} ${
              messageKey === 'ERROR' ? styles.exerciseCard__message__error : ''
            } my-3`}
          >
            {message}
          </div>
          <div className="d-flex flex-column flex-md-row">
            <NewButton
              onClick={() => {
                if (studentAnswer.trim() === answer.trim()) {
                  setMessageKey('SUCCESS')
                  setAnswerShown(true)
                } else {
                  setMessageKey('ERROR')
                }
              }}
            >
              SUBMIT
            </NewButton>
            <button
              className="bg-transparent mt-2 mt-md-0 ms-md-3 border-0 fw-normal"
              onClick={() => setAnswerShown(!answerShown)}
            >
              <Text size="xs" bold>
                {answerShown ? 'Hide Answer' : 'Show Answer'}
              </Text>
            </button>
          </div>
        </div>
      </div>
      {answerShown && (
        <>
          <hr />
          <div className="fw-bold mb-2">Answer</div>
          <div className="d-flex flex-column flex-md-row mb-2">
            <pre
              className={`bg-light py-3 px-4 mb-2 mb-md-0 me-md-3 ${styles.exerciseCard__section}`}
            >
              {answer}
            </pre>
            <div className={`ms-md-3 ${styles.exerciseCard__section}`}>
              {explanation}
            </div>
          </div>
        </>
      )}
    </section>
  )
}

export default ExerciseCard
