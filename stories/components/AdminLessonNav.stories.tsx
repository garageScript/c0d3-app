import { toUpper } from 'lodash'
import Link from 'next/link'
import { useRouter } from 'next/router'
import * as React from 'react'
import AdminLessonNav from '../../components/admin/lessons/AdminLessonNav'
import styles from '../../scss/adminLessonNav.module.scss'

export default {
  component: AdminLessonNav,
  title: 'Components/AdminLessonNav'
}

export const Basic = () => {
  const router = useRouter()

  const SideNavComponent = ({
    urlPageName,
    tabName
  }: {
    urlPageName: string
    tabName: string
  }) => {
    const isSelected = router.asPath.split('/').slice(-1)[0] === urlPageName

    const className =
      styles[
        isSelected
          ? 'lessons_tabsNav__nav__item'
          : 'lessons_tabsNav__nav__item--inactive'
      ]

    return (
      <Link href={`/admin/lessons/1/${urlPageName}`}>
        <a className={className + ' ' + 'nav-pills'}>{toUpper(tabName)}</a>
      </Link>
    )
  }

  return (
    <AdminLessonNav
      tabs={[
        { tabName: 'introduction', urlPageName: 'introduction' },
        { tabName: 'modules', urlPageName: 'modules' },
        { tabName: 'challenges', urlPageName: 'challenges' }
      ]}
      Component={SideNavComponent}
    />
  )
}

const parameters = {
  nextRouter: {
    asPath: 'c0d3.com/admin/lessons/1/introduction'
  }
}

Basic.parameters = parameters
