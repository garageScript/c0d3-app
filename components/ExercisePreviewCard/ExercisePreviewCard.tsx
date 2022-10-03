import Markdown from 'markdown-to-jsx'
import React from 'react'
import styles from './exercisePreviewCard.module.scss'

export type ExercisePreviewCardProps = {
  moduleName: string
  state?: 'NOT ANSWERED' | 'INCORRECT' | 'ANSWERED'
  problem: string
  className?: string
}

const ExercisePreviewCard = ({
  moduleName,
  state,
  problem,
  className = ''
}: ExercisePreviewCardProps) => {
  const [topBorderStyle, topMessageStyle] =
    state === 'ANSWERED'
      ? [
          styles.exercisePreviewCard__topBorder__success,
          styles.exercisePreviewCard__topMessage__success
        ]
      : [
          styles.exercisePreviewCard__topBorder__danger,
          styles.exercisePreviewCard__topMessage__danger
        ]

  return (
    <section
      className={`card p-3 d-inline-block border-0 shadow position-relative overflow-hidden ${className}`}
    >
      {state && <div className={topBorderStyle} />}
      <div className="d-flex align-items-center mb-3">
        <h2 className="fw-bold fs-6 my-2 me-4">{moduleName.toUpperCase()}</h2>
        {state && <div className={`badge ${topMessageStyle}`}>{state}</div>}
      </div>
      <div className="mb-2">Problem</div>
      <Markdown className="d-block bg-light py-2 px-3">{problem}</Markdown>
    </section>
  )
}

export default ExercisePreviewCard
