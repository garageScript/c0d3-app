import React, { useState } from 'react'
import { NewButton } from '../theme/Button'
import { Text } from '../theme/Text'
import styles from './exerciseCard.module.scss'

export type ExerciseCardProps = {
  challengeName: string
  problem: string
  answer: string
  explanation: string
}

const messages = {
  EMPTY: '',
  ERROR: 'Your answer is incorrect - please try again.',
  SUCCESS: '🎉 Your answer is correct!'
} as const

type MessageKey = keyof typeof messages

const ExerciseCard = ({
  challengeName,
  problem,
  answer,
  explanation
}: ExerciseCardProps) => {
  const [studentAnswer, setStudentAnswer] = useState('')
  const [answerShown, setAnswerShown] = useState(false)
  const [messageKey, setMessageKey] = useState<MessageKey>('EMPTY')
  const message = messages[messageKey]

  return (
    <section className="card p-4 border-0 shadow">
      <div className="fw-bold mb-2">Problem</div>
      <div className="d-flex mb-2">
        <pre className="w-50 bg-light py-3 px-4 mb-0 me-3">{problem}</pre>
        <div className="w-50 ms-3">
          <div className="mb-2">{challengeName}</div>
          <input
            aria-label="User answer"
            className="form-control mb-2"
            value={studentAnswer}
            onChange={e => setStudentAnswer(e.target.value)}
          />
          <div
            className={`${styles.exerciseCard__message} ${
              messageKey === 'ERROR' ? styles.exerciseCard__message__error : ''
            } my-2`}
          >
            {message}
          </div>
          <div className="d-flex">
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
              className="bg-transparent ms-3 border-0 fw-normal"
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
          <div className="d-flex mb-2">
            <pre className="w-50 bg-light py-3 px-4 mb-0 me-3">{answer}</pre>
            <div className="w-50 ms-3">{explanation}</div>
          </div>
        </>
      )}
    </section>
  )
}

export default ExerciseCard
