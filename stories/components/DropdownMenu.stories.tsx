import React from 'react'
import { DropdownMenu } from '../../components/DropdownMenu'

export default {
  component: DropdownMenu,
  title: 'Components/DropdownMenu'
}

const dropdownMenuItems = [
  { title: 'Lessons', path: '/admin/lessons' },
  { title: 'Users', path: '/admin/users' },
  { title: 'Alerts0', path: '/admin/alerts' }
]

const separatedMenu = [
  { title: 'Lessons', path: '/admin/lessons' },
  null,
  { title: 'Users', path: '/admin/users' },
  null,
  { title: 'Alerts1', path: '/admin/alerts' },
  { title: 'Alerts2', path: '/admin/alerts' },
  { title: 'Alerts3', path: '/admin/alerts' },
  null,
  { title: 'Alerts4', path: '/admin/alerts' }
]

export const Basic: React.FC = () => (
  <DropdownMenu title="Admin" items={dropdownMenuItems} />
)

export const _WithSeparators: React.FC = () => (
  <DropdownMenu title="Admin" items={separatedMenu} />
)
