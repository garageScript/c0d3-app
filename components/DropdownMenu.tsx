import React from 'react'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import styles from '../scss/dropDown.module.scss'
import { DropDirection } from 'react-bootstrap/esm/DropdownContext'

//a null item indicates a dropdown divider
export type Item = {
  title: string
  path?: string
  as?: 'a' | 'button'
  onClick?: Function
} | null

type DropDownMenuProps = {
  drop?: DropDirection
  items: Item[]
  title: string
  size?: 'sm' | 'lg' | undefined
  variant?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'info'
    | 'warning'
    | 'danger'
    | 'none'
  //changes the underlying component CSS base class name
  //https://react-bootstrap.github.io/components/dropdowns/#api
  bsPrefix?: string
}

export const DropdownMenu: React.FC<DropDownMenuProps> = ({
  drop = 'down',
  variant = 'none',
  title,
  size,
  items,
  bsPrefix
}) => {
  const menuItems = items.map((item: Item, itemsIndex: number) =>
    !item ? (
      <Dropdown.Divider key={itemsIndex} />
    ) : (
      <div className="text-center py-2 px-4" key={item.title}>
        <Dropdown.Item
          as={item.as || 'a'}
          key={itemsIndex}
          href={item.path}
          onClick={() => item.onClick && item.onClick(item.title)}
          bsPrefix={bsPrefix}
        >
          {item.title}
        </Dropdown.Item>
      </div>
    )
  )

  return (
    <>
      <div className="d-none d-lg-block">
        <DropdownButton
          title={title}
          variant={variant}
          size={size}
          drop={drop}
          bsPrefix={styles.title}
        >
          {menuItems}
        </DropdownButton>
      </div>
      <div className="d-lg-none">{menuItems}</div>
    </>
  )
}
