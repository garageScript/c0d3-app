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
  onAddItem: (m?: Item) => void
  selectedIndex?: number
  onSelect: (item: Item) => void
  itemName?: string
}

const AdminLessonSideNav = ({
  items,
  onAddItem,
  selectedIndex,
  onSelect,
  itemName = 'item'
}: Props) => {
  const itemsList = items.map(item => {
    const isActive = selectedIndex === item.id
    const className =
      styles[
        isActive
          ? 'container__itemsList__item--active'
          : 'container__itemsList__item'
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
  const onAddNewItemClick = () =>
    isNumber(selectedIndex) && onAddItem(get(items, selectedIndex))

  return (
    <div className={styles.container}>
      <span className={styles.container__heading}>Existing {itemName}s</span>
      <ol className={styles.container__itemsList}>
        {itemsList.length ? (
          itemsList
        ) : (
          <div className={styles.container__error}>
            <AlertFillIcon />
            <span className={styles.container__heading}>
              No {itemName}s in this lesson
            </span>
          </div>
        )}
      </ol>
      <button
        onClick={onAddNewItemClick}
        className={styles['container--button']}
      >
        ADD NEW {itemName.toUpperCase()}
      </button>
    </div>
  )
}

export default AdminLessonSideNav
