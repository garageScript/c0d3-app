import React from 'react'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

//a null item indicates a dropdown divider
export type Item = {
  title: string
  path?: string
  as?: 'a' | 'button'
  onClick?: Function
} | null

type DropDownMenuProps = {
  drop?: 'down' | 'right' | 'up' | 'left'
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
}

export const DropdownMenu: React.FC<DropDownMenuProps> = ({
  drop = 'down',
  variant = 'none',
  title,
  size,
  items
}) => {
  const menuItems = items.map((item: Item, itemsIndex: number) =>
    !item ? (
      <Dropdown.Divider key={itemsIndex} />
    ) : (
      <Dropdown.Item
        as={item.as || 'a'}
        key={itemsIndex}
        href={item.path}
        onClick={() => item.onClick && item.onClick(item.title)}
      >
        {item.title}
      </Dropdown.Item>
    )
  )

  return (
    <DropdownButton title={title} variant={variant} size={size} drop={drop}>
      {menuItems}
    </DropdownButton>
  )
}
