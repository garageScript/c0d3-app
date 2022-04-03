import React from 'react'
import _ from 'lodash'
import { Module } from '../../../graphql/index'
import styles from '../../../scss/sideBar.module.scss'
import { XIcon, ChevronRightIcon } from '@primer/octicons-react'

type SideBarProps = {
  modules: Module[] | []
  selectedModule: number
}
export const SideBar: React.FC<SideBarProps> = ({
  modules,
  selectedModule
}) => {
  const moduleListData = [_.cloneDeep(modules) || []]
  const lessonList = moduleListData[0].map((obj: any, arrIndex: number) => (
    <>
      <a
        key={'module' + obj.id}
        data-testid="module-title"
        role="tab"
        className={
          `${styles.sidebar_tabsNav}` +
          (arrIndex === selectedModule
            ? ` ${styles.sidebar_tabsNav__active}`
            : '')
        }
        data-toggle="pill"
        style={{ wordBreak: 'break-word', cursor: 'pointer' }}
      >
        <div className="innerText">{obj.name}</div>
        <div className={styles.sidebar_arrow}>
          {' '}
          {<ChevronRightIcon size={24} />}{' '}
        </div>
        <div className={styles.sidebar_deleteX}>
          <XIcon size={24} />
        </div>
      </a>
    </>
  ))

  return (
    <div
      className={styles.sidebar_mainbody}
      role="tablist"
      aria-orientation="vertical"
    >
      <span className={`${styles.sidebar_title}`}>EXISTING MODULES</span>
      {lessonList}
      <button className={styles.sidebar_addButton}>ADD NEW MODULE</button>
    </div>
  )
}
