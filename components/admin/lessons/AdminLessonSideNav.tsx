import React, { useEffect } from 'react'
import { ApolloError } from '@apollo/client'
import { AlertFillIcon, ChevronRightIcon } from '@primer/octicons-react'
import { isNumber } from 'lodash'
import { Spinner } from 'react-bootstrap'
import { get } from 'lodash'
import styles from '../../../scss/adminLessonSideNav.module.scss'

type Item = {
  id: number
  name: string
  content: string
  lesson: { id?: number }
}

type Items = Item[]

type Props = {
  items: Items | undefined
  title: string
  lessonId: number
  onAddItem: (m: Item | undefined) => void
  loading?: boolean
  error?: ApolloError
  setActive?: React.Dispatch<React.SetStateAction<number>>
  active?: number
}

const AdminLessonSideNav = ({
  items,
  onAddItem,
  loading,
  error,
  setActive,
  active,
  title,
  lessonId
}: Props) => {
  const setAsActive = (id: number) => setActive && setActive(id)

  const itemsList =
    items &&
    items.reduce((acc: JSX.Element[], item) => {
      if (item.lesson.id === lessonId) {
        const isActive = active === item.id
        const className =
          styles[
            isActive
              ? 'container__modulesList__module--active'
              : 'container__modulesList__module'
          ]
        const withChevron = !isActive && <ChevronRightIcon size={16} />

        acc.push(
          <li
            className={className}
            key={item.id}
            onClick={() => setAsActive(item.id)}
          >
            <span>{item.name}</span>
            {withChevron}
          </li>
        )
      }

      return acc
    }, [])

  useEffect(() => setActive && setActive(-1), [lessonId])

  const renderItems = () => {
    if (error) {
      return (
        <div className={styles.container__error}>
          <AlertFillIcon />
          <span className={styles.container__heading}>
            Failed to get the modules
          </span>
        </div>
      )
    }

    if (loading || lessonId < 0) {
      return (
        <>
          <span className={styles.container__heading}>Existing {title}</span>
          <ol
            className={`${styles.container__modulesList} ${styles['container__modulesList--loading']}`}
          >
            <Spinner animation={'border'} role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </ol>
          <button className={styles['container--button']}>
            ADD NEW MODULE
          </button>
        </>
      )
    }

    const onClick = () => isNumber(active) && onAddItem(get(items, active))

    if (get(itemsList, 'length')) {
      return (
        <>
          <span className={styles.container__heading}>Existing {title}</span>
          <ol className={styles.container__modulesList}>{itemsList}</ol>
          <button onClick={onClick} className={styles['container--button']}>
            ADD NEW MODULE
          </button>
        </>
      )
    }

    return (
      <>
        <span className={styles.container__heading}>Existing {title}</span>
        <ol className={styles.container__modulesList}>
          <div className={styles.container__error}>
            <AlertFillIcon />
            <span className={styles.container__heading}>
              No modules in this lesson
            </span>
          </div>
        </ol>

        <button onClick={onClick} className={styles['container--button']}>
          ADD NEW MODULE
        </button>
      </>
    )
  }

  return <div className={styles.container}>{renderItems()}</div>
}

export default AdminLessonSideNav
