import { toUpper } from 'lodash'
import React, { useState } from 'react'
import { Tab, Col, Nav } from 'react-bootstrap'
import styles from '../../../scss/adminLessonNav.module.scss'

const AdminLessonNav = ({
  navItems,
  tabs
}: {
  navItems: { value: string }[]
  tabs: (() => JSX.Element)[]
}) => {
  const [key, setKey] = useState<string | null>(navItems[0].value)

  const isActive = (k: string, data?: { active: string; inactive: string }) => {
    const isActiveBool = k === key
    if (!data?.active && !data?.inactive) return isActiveBool

    return isActiveBool ? data.active : data.inactive
  }

  const tabNavItems = navItems.map((item, index) => (
    <Nav.Item key={index}>
      <Nav.Link
        active={isActive(item.value) as boolean}
        className={
          isActive(item.value, {
            active: styles.lessons_tabsNav__nav__item,
            inactive: styles['lessons_tabsNav__nav__item--inactive']
          }) as string
        }
        eventKey={item.value}
      >
        {toUpper(item.value)}
      </Nav.Link>
    </Nav.Item>
  ))

  const tabPanes = navItems.map((item, index) => (
    <Tab.Pane key={index} eventKey={item.value}>
      {tabs[index]()}
    </Tab.Pane>
  ))

  const setActiveKey = (k: string | null) => setKey(k)

  return (
    <Tab.Container activeKey={key!} onSelect={setActiveKey}>
      <Col className={styles.lessons_tabsNav}>
        <Nav variant="pills" className={styles.lessons__tabsNav__nav}>
          {tabNavItems}
        </Nav>
      </Col>
      <Col className={styles.lessons_tabs}>
        <Tab.Content>{tabPanes}</Tab.Content>
      </Col>
    </Tab.Container>
  )
}

export default AdminLessonNav
