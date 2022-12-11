import Markdown from 'markdown-to-jsx'
import React, { useState } from 'react'
import ExerciseReportCard from '../ExerciseReportCard'
import { NewButton } from '../theme/Button'
import { Text } from '../theme/Text'
import styles from './exerciseCard.module.scss'

export type ExerciseCardProps = {
  problem: string
  answer: string
  explanation: string
  answerShown: boolean
  setAnswerShown: (answerShown: boolean) => void
  message: Message
  setMessage: (message: Message) => void
  submitUserAnswer: (userAnswer: string) => void
  exerciseId: number
}

export enum Message {
  EMPTY = '',
  ERROR = 'Your answer is incorrect - please try again.',
  SUCCESS = '🎉 Your answer is correct!'
}

const ExerciseCard = ({
  problem,
  answer,
  explanation,
  answerShown,
  setAnswerShown,
  message,
  setMessage,
  submitUserAnswer,
  exerciseId
}: ExerciseCardProps) => {
  const [studentAnswer, setStudentAnswer] = useState('')

  return (
    <section className="card p-5 border-0 shadow">
      <div className="d-flex flex-column flex-md-row mb-2">
        <div className={`mb-0 me-md-3 ${styles.exerciseCard__section}`}>
          <div className="fw-bold mb-2">Problem</div>
          <Markdown className="d-block bg-light py-3 px-4">{problem}</Markdown>
        </div>
        <div className={`ms-md-3 ${styles.exerciseCard__section}`}>
          <div className="fw-bold mt-2 mt-md-0 mb-2">Your Answer</div>
          <input
            aria-label="User answer"
            className={`form-control mb-2 ${
              message === Message.ERROR ? styles.exerciseCard__input__error : ''
            }`}
            value={studentAnswer}
            onChange={e => setStudentAnswer(e.target.value)}
          />
          <div
            className={`${styles.exerciseCard__message} ${
              message === Message.ERROR
                ? styles.exerciseCard__message__error
                : ''
            } my-3`}
          >
            {message}
          </div>
          <div className="d-flex flex-column flex-md-row">
            <NewButton
              onClick={() => {
                if (studentAnswer.trim() === answer.trim()) {
                  setMessage(Message.SUCCESS)
                  setAnswerShown(true)
                } else {
                  setMessage(Message.ERROR)
                }
                submitUserAnswer(studentAnswer.trim())
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
            <Markdown
              className={`d-block bg-light py-3 px-4 mb-2 mb-md-0 me-md-3 ${styles.exerciseCard__section}`}
            >
              {answer}
            </Markdown>
            <Markdown
              className={`d-block ms-md-3 ${styles.exerciseCard__section}`}
            >
              {explanation}
            </Markdown>
          </div>
        </>
      )}
      <ExerciseReportCard exerciseId={exerciseId} />
    </section>
  )
}

export default ExerciseCard
