import React, { FunctionComponent } from 'react'
import styles from '../../../scss/adminLessonNav.module.scss'

type Props = {
  tabs: { tabName: string; urlPageName: string }[]
  Component: FunctionComponent<{ tabName: string; urlPageName: string }>
}

const AdminLessonNav: React.FC<Props> = ({ tabs, Component }: Props) => {
  return (
    <div>
      <div className={styles.lessons_tabsNav}>
        <div className={styles.lessons__tabsNav__nav}>
          {tabs.map((tab, i) => (
            <Component
              key={i}
              tabName={tab.tabName}
              urlPageName={tab.urlPageName}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default AdminLessonNav
