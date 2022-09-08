import Link from 'next/link'
import React from 'react'
import styles from '../scss/navCard.module.scss'

type Tab = {
  text: string
  url: string
  isSelected: boolean
}

type NavCardProps = {
  tabs: Tab[]
}

const NavCard = ({ tabs }: NavCardProps) => {
  return (
    <div className={styles.navCard__tabsNav}>
      <div className={styles.navCard__tabsNav__nav}>
        {tabs.map((tab, i) => (
          <NavCardItem key={i} tab={tab} />
        ))}
      </div>
    </div>
  )
}

type NavCardItemProps = {
  tab: Tab
}

const NavCardItem = ({ tab }: NavCardItemProps) => {
  const className =
    styles[
      tab.isSelected
        ? 'navCard__tabsNav__nav__item'
        : 'navCard__tabsNav__nav__item--inactive'
    ]

  return (
    <Link href={tab.url}>
      <a className={`${className} nav-pills`}>{tab.text.toUpperCase()}</a>
    </Link>
  )
}

export default NavCard
