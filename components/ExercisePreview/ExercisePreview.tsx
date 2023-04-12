import React from 'react'
import styles from './exercisePreview.module.scss'
import Markdown from 'markdown-to-jsx'

type Exercise = {
  description: string
  answer: string
  explanation: string
}

type Props = {
  exercise: Exercise
  classes?: string
}

const ExercisePreview: React.FC<Props> = ({ exercise, classes }) => {
  const classesList =
    classes ||
    'col-sm-8 col-md-7 col-lg-6 col-xl-5 m-auto px-md-3 border-0 rounded'

  return (
    <div className={`card shadow-sm ${classesList}`}>
      <div className="card-body pb-3 ">
        <div className="card-text">
          <p className={`${styles['exercise__p__bold']} my-4`}>Problem</p>
          <div className={`${styles['exercise__bg']} rounded px-4 py-4`}>
            <Markdown>{exercise.description}</Markdown>
          </div>
          <p className={`${styles['exercise__p__bold']} my-4`}>Answer</p>
          <div className={`${styles.excercise__answer} overflow-auto`}>
            <div className={`${styles['exercise__bg']} rounded px-4 py-4`}>
              {exercise.answer}
            </div>
          </div>
          <p className={`${styles['exercise__p__bold']} my-4`}>Explanation</p>
          <div className={`${styles['exercise__bg']} rounded px-4 py-4`}>
            <Markdown>{exercise.explanation}</Markdown>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExercisePreview
