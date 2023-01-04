import { KebabHorizontalIcon } from '@primer/octicons-react'
import Markdown from 'markdown-to-jsx'
import React from 'react'
import { useRemoveExerciseMutation } from '../../graphql'
import { DropdownMenu } from '../DropdownMenu'
import QueryInfo from '../QueryInfo'
import styles from './exercisePreviewCard.module.scss'

export type ExercisePreviewCardProps = {
  moduleName: string
  state?: 'NOT ANSWERED' | 'INCORRECT' | 'ANSWERED'
  problem: string
  className?: string
  id: number
  onDelete?: () => void
}

const ExercisePreviewCard = ({
  moduleName,
  state,
  problem,
  id,
  onDelete,
  className = ''
}: ExercisePreviewCardProps) => {
  const [removedExercise, { data, loading, error }] =
    useRemoveExerciseMutation()

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
      <div className={styles.header__container}>
        {data && data.removeExercise.id !== id ? (
          <></>
        ) : (
          <QueryInfo
            data={data}
            loading={loading}
            error={error?.message || ''}
            texts={{
              loading: 'Deleting the exercise...',
              data: 'Deleted the exercise successfully!',
              error: 'Oops, failed to delete the exercise. Please try again!'
            }}
          />
        )}
        <div className={styles.header__container__module__state}>
          <div className="d-flex align-items-center mb-3">
            <h2 className="fw-bold fs-6 my-2 me-4">
              {moduleName.toUpperCase()}
            </h2>
            {state && <div className={`badge ${topMessageStyle}`}>{state}</div>}
          </div>
          {!state && (
            <DropdownMenu
              items={[
                {
                  title: 'Delete',
                  onClick: async () => {
                    await removedExercise({
                      variables: {
                        id
                      }
                    })

                    onDelete?.()
                  }
                }
              ]}
              customToggle={{
                style: styles.dropdown,
                Component: () => {
                  return (
                    <div>
                      <KebabHorizontalIcon size={24} />
                    </div>
                  )
                }
              }}
            />
          )}
        </div>
      </div>
      <div className="mb-2">Problem</div>
      <Markdown className="d-block bg-light py-2 px-3">{problem}</Markdown>
    </section>
  )
}

export default ExercisePreviewCard
