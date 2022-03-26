import { toUpper } from 'lodash'
import { uniq } from 'lodash/fp'
import React, { useState, useMemo } from 'react'
import { Tab, Col, Nav } from 'react-bootstrap'
import styles from '../../../scss/adminLessonNav.module.scss'

type NavItem = { value: string }
type Tab = () => JSX.Element

type NavItems = [NavItem, ...NavItem[]]
type TabsType = [Tab, ...Tab[]]

type Props = {
  navItems: NavItems
  tabs: TabsType
}

const validateProps = ({ navItems, tabs }: Props) => {
  if (navItems.length !== tabs.length)
    throw new Error(
      `navItems and tabs should have the same count. navItems: ${navItems.length} -- tabs: ${tabs.length}`
    )

  const mapObjArrayToValues = navItems.map(item => item.value)

  if (uniq(mapObjArrayToValues).length !== navItems.length) {
    throw new Error('navItems should have unique items value. No duplicates')
  }
}

const AdminLessonNav: React.FC<Props> = ({ navItems, tabs }: Props) => {
  useMemo(() => validateProps({ navItems, tabs }), [])

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
        bsPrefix={
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

  return (
    <Tab.Container activeKey={key!} onSelect={setKey}>
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
