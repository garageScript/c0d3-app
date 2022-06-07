import React, { FunctionComponent } from 'react'
import styles from '../../../scss/adminLessonNav.module.scss'

type Tab = { tabName: string; urlPageName: string }

type Props = {
  tabs: Tab[]
  Component: FunctionComponent<{ tab: Tab }>
}

const AdminLessonNav: React.FC<Props> = ({ tabs, Component }: Props) => {
  return (
    <div>
      <div className={styles.lessons_tabsNav}>
        <div className={styles.lessons__tabsNav__nav}>
          {tabs.map((tab, i) => (
            <Component key={i} tab={tab} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default AdminLessonNav
