import React, { useState } from 'react'
import _ from 'lodash'
import '../scss/navbar.scss'
import NavLink from './NavLink'

const adminStyle = {
  padding: 'none',
  margin: '0 0 0 0'
}

export const AdminDropDownMenu: React.FC = () => {
  const [showOptions, setShowOptions] = useState('dropdown-menu')
  const showMenu = () => setShowOptions('dropdown-menu show')
  const hideMenu = () => setShowOptions('dropdown-menu')
  return (
    <div className="dropdown">
      <div
        style={adminStyle}
        data-testid="adminButton"
        onClick={showMenu}
        onMouseOut={hideMenu}
        className="btn btn-secondary dropdown-toggle"
        aria-expanded="false"
      >
        Admin
      </div>
      <div
        data-testid="menu"
        style={adminStyle}
        className={showOptions}
        onMouseOver={showMenu}
        onMouseOut={hideMenu}
      >
        <NavLink path="/admin/lessons" className="dropdown-item">
          Lesson
        </NavLink>
        <NavLink path="/admin/users" className="dropdown-item">
          Users
        </NavLink>
        <NavLink path="/admin/alerts" className="dropdown-item">
          Alerts
        </NavLink>
      </div>
    </div>
  )
}
