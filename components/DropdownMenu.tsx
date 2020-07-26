import React from 'react'
import _ from 'lodash'
import '../scss/navbar.scss'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import noop from '../helpers/noop'

//a null item indicates a dropdown divider
type Item = {
  title: string
  path: string
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

const menuItems = (items: Item[]) => {
  return items.map((item: Item, i: number) =>
    !item ? (
      <Dropdown.Divider key={i} />
    ) : (
      <Dropdown.Item
        as="button"
        key={i}
        href={item.path}
        onClick={(item.onClick && item.onClick()) || noop()}
      >
        {item.title}
      </Dropdown.Item>
    )
  )
}

export const DropdownMenu: React.FC<DropDownMenuProps> = ({
  drop = 'down',
  variant = 'none',
  title,
  size,
  items
}) => (
  <DropdownButton title={title} variant={variant} size={size} drop={drop}>
    {menuItems(items)}
  </DropdownButton>
)
