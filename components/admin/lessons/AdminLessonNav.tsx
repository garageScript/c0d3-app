import React from 'react'
import styles from '../../../scss/adminLessonNav.module.scss'

type Props = {
  tabs: { tabName: string; urlPageName: string }[]
  render: (navItem: { tabName: string; urlPageName: string }) => JSX.Element
}

const AdminLessonNav: React.FC<Props> = ({ tabs, render }: Props) => {
  return (
    <div>
      <div className={styles.lessons_tabsNav}>
        <div className={styles.lessons__tabsNav__nav}>
          {tabs.map((tab, i) => (
            <React.Fragment key={i}>{render(tab)}</React.Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AdminLessonNav
