import React from 'react'
import { AlertFillIcon, ChevronRightIcon } from '@primer/octicons-react'
import { isNumber } from 'lodash'
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
  items: Items
  title: string
  onAddItem: (m?: Item) => void
  selectedId?: number
  onSelect: (item: Item) => void
}

const AdminLessonSideNav = ({
  items,
  onAddItem,
  selectedId,
  title,
  onSelect
}: Props) => {
  const itemsList = items.map(item => {
    const isActive = selectedId === item.id
    const className =
      styles[
        isActive
          ? 'container__modulesList__module--active'
          : 'container__modulesList__module'
      ]
    const withChevron = !isActive && <ChevronRightIcon size={16} />

    return (
      <li className={className} key={item.id} onClick={() => onSelect(item)}>
        <span>{item.name}</span>
        {withChevron}
      </li>
    )
  })

  // Used isNumber to treat zeros as truthy values
  const onAddNewModuleClick = () =>
    isNumber(selectedId) && onAddItem(get(items, selectedId))

  return (
    <div className={styles.container}>
      <span className={styles.container__heading}>Existing {title}</span>
      <ol className={styles.container__modulesList}>
        {itemsList.length ? (
          itemsList
        ) : (
          <div className={styles.container__error}>
            <AlertFillIcon />
            <span className={styles.container__heading}>
              No modules in this lesson
            </span>
          </div>
        )}
      </ol>
      <button
        onClick={onAddNewModuleClick}
        className={styles['container--button']}
      >
        ADD NEW MODULE
      </button>
    </div>
  )
}

export default AdminLessonSideNav
