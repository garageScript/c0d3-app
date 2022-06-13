import React from 'react'
import styles from '../scss/exercisePreview.module.scss'

type Exercise = {
  question: string
  options: string[]
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
      <div className="card-body pt-3 pb-3 ">
        <p className="card-text">
          <p className={`${styles['exercise__p__bold']}`}>Problem</p>
          <pre className={`${styles['exercise__pre__bg']} rounded px-4 py-4`}>
            {exercise.question}
          </pre>
          <p className={`${styles['exercise__p__bold']}`}>Choose an answer</p>
          <div className="excercise__options overflow-auto">
            {exercise.options.map((option, index) => (
              <pre
                key={index}
                className={`${styles['exercise__pre__bg']} ${styles['exercise__pre__answer']} rounded px-4 py-4`}
              >
                {option}
              </pre>
            ))}
          </div>
        </p>
      </div>
    </div>
  )
}

export default ExercisePreview
