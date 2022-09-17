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

const ExerciseCard = ({
  challengeName,
  problem,
  answer,
  explanation
}: ExerciseCardProps) => {
  const [studentAnswer, setStudentAnswer] = useState('')
  const [message, setMessage] = useState('')
  const [answerShown, setAnswerShown] = useState(false)

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
          <div className={`${styles.exerciseCard__message} my-2`}>
            <Text size="sm">{message}</Text>
          </div>
          <div className="d-flex">
            <NewButton
              onClick={() => {
                if (studentAnswer.trim() === answer.trim()) {
                  setMessage('🎉 Your answer is correct!')
                  setAnswerShown(true)
                } else {
                  setMessage('Your answer is incorrect - please try again.')
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
