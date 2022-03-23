import { toUpper } from 'lodash'
import React, { useState } from 'react'
import { Tab, Col, Nav } from 'react-bootstrap'
import styles from '../../../scss/adminLessonNav.module.scss'

const AdminLessonNav = ({
  navItems,
  tabs
}: {
  navItems: { value: string; children?: string[] }[]
  tabs: (() => JSX.Element)[]
}) => {
  const [key, setKey] = useState<string>('introduction')

  const isActive = (k: string, data?: { active: string; inactive: string }) => {
    const isActiveBool = k === key
    if (!data?.active && !data?.inactive) return isActiveBool

    return isActiveBool ? data.active : data.inactive
  }

  const renderItems = (items: { value: string; children?: string[] }[]) =>
    items.map((item, index) => (
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

  const renderTabPanes = (
    items: { value: string; children?: string[] }[],
    tabs: (() => JSX.Element)[]
  ) => {
    return items.reduce((acc, item, index) => {
      acc.push(
        <Tab.Pane key={index} eventKey={item.value}>
          {tabs[index]()}
        </Tab.Pane>
      )

      return acc
    }, [] as JSX.Element[])
  }

  const setActiveKey = (k: any) => setKey(k)

  return (
    <Tab.Container activeKey={key} onSelect={k => setActiveKey(k)}>
      <Col className={styles.lessons_tabsNav}>
        <Nav variant="pills" className={styles.lessons__tabsNav__nav}>
          {renderItems(navItems)}
        </Nav>
      </Col>
      <Col className={styles.lessons_tabs}>
        <Tab.Content>{renderTabPanes(navItems, tabs)}</Tab.Content>
      </Col>
    </Tab.Container>
  )
}

export default AdminLessonNav
