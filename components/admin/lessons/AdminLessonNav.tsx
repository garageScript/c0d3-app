import { toUpper } from 'lodash'
import React, { useState } from 'react'
import { Tab, Col, Nav } from 'react-bootstrap'
import styles from '../../../scss/adminLessonNav.module.scss'

type reduceAcc = JSX.Element[]

type Panels = { tabName: string; tabComponent: () => JSX.Element }[]

type Props = {
  panels: Panels
}

const AdminLessonNav: React.FC<Props> = ({ panels }: Props) => {
  const [key, setKey] = useState<string | null>(panels[0].tabName)

  const isActive = (k: string, data?: { active: string; inactive: string }) => {
    const isActiveBool = k === key
    if (!data?.active && !data?.inactive) return isActiveBool

    return isActiveBool ? data.active : data.inactive
  }

  const tabPanels = panels.reduce(
    (acc, { tabName, tabComponent }, index) => {
      acc.tabNavItems.push(
        <Nav.Item key={index}>
          <Nav.Link
            active={isActive(tabName) as boolean}
            bsPrefix={
              isActive(tabName, {
                active: styles.lessons_tabsNav__nav__item,
                inactive: styles['lessons_tabsNav__nav__item--inactive']
              }) as string
            }
            eventKey={tabName}
          >
            {toUpper(tabName)}
          </Nav.Link>
        </Nav.Item>
      )

      acc.tabPanes.push(
        <Tab.Pane key={index} eventKey={tabName}>
          {tabComponent()}
        </Tab.Pane>
      )

      return acc
    },
    {
      tabNavItems: [] as reduceAcc,
      tabPanes: [] as reduceAcc
    }
  )

  return (
    <Tab.Container id="admin-nav-tabs" activeKey={key!} onSelect={setKey}>
      <Col className={styles.lessons_tabsNav}>
        <Nav variant="pills" className={styles.lessons__tabsNav__nav}>
          {tabPanels.tabNavItems}
        </Nav>
      </Col>
      <Col className={styles.lessons_tabs}>
        <Tab.Content>{tabPanels.tabPanes}</Tab.Content>
      </Col>
    </Tab.Container>
  )
}

export default AdminLessonNav
