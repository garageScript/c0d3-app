import React, { useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import styles from '../scss/dropDown.module.scss'
import { DropDirection } from 'react-bootstrap/esm/DropdownContext'
import { ChevronRightIcon } from '@primer/octicons-react'

//a null item indicates a dropdown divider
export type Item = {
  title: string
  path?: string
  as?: 'a' | 'button'
  onClick?: Function
} | null

type DropDownMenuProps = {
  drop?: DropDirection
  items?: Item[] | null
  title?: string
  //changes the underlying component CSS base class name
  //https://react-bootstrap.github.io/components/dropdowns/#api
  bsPrefix?: string
}

const ChevronRight = () => <ChevronRightIcon size={17} />

export const DropdownMenu: React.FC<DropDownMenuProps> = ({
  items,
  title,
  bsPrefix = ''
}) => {
  const [activeItem, setActiveItem] = useState({ title })

  return (
    <Dropdown bsPrefix={bsPrefix}>
      <Dropdown.Toggle
        bsPrefix={styles.dropdown}
        id="dropdown-lesson"
        data-testid="dropdown-lesson"
      >
        {activeItem.title || 'None'}
        <ChevronRight />
      </Dropdown.Toggle>

      <Dropdown.Menu className={styles.dropdown__menu}>
        {items?.map((item, index) =>
          item ? (
            <Dropdown.Item
              key={`${item?.title}-${index}`}
              onClick={() => {
                item?.onClick?.(item)

                setActiveItem({
                  title: item?.title
                })
              }}
            >
              {item?.title}
            </Dropdown.Item>
          ) : (
            <Dropdown.Divider key={index} />
          )
        )}
      </Dropdown.Menu>
    </Dropdown>
  )
}
