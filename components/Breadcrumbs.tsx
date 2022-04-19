import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import styles from '../scss/breadcrumbs.module.scss'
import { Dropdown } from 'react-bootstrap'
import { GetAppQuery } from '../graphql'
import { ChevronRightIcon } from '@primer/octicons-react'
import { lowerCase } from 'lodash'

type Props = {
  omitHomeRoute?: boolean
  homeTitle?: string
  lessonTitle: string
  setLessonTitle: Dispatch<SetStateAction<string>>
  lessons: GetAppQuery['lessons'] | undefined
}

type Breadcrumb = {
  href: string
  title: string
}

type BreadcrumbProps = {
  breadcrumb: Breadcrumb
  index: number
}

const convertBreadcrumb = (breadcrumb: string) => {
  return (
    breadcrumb.replace(/-/g, ' ').charAt(0).toUpperCase() + breadcrumb.slice(1)
  )
}

const Breadcrumbs = ({
  omitHomeRoute = false,
  homeTitle = 'Home',
  lessonTitle,
  setLessonTitle,
  lessons
}: Props) => {
  const router = useRouter()
  const [breadcrumbs, setBreadcrumbs] = useState<
    | {
        title: string
        href: string
      }[]
    | null
  >(null)

  useEffect(() => {
    const [_, ...urlPath] = router.asPath.split('/')

    const pathArray = urlPath.map((path, i) => {
      return {
        title: path,
        href: `/${urlPath.slice(0, i + 1).join('/')}`
      }
    })

    setBreadcrumbs(pathArray)
  }, [])

  if (!breadcrumbs) return null

  const ChevronRight = () => <ChevronRightIcon size={17} />

  const Breadcrumb = ({ breadcrumb, index }: BreadcrumbProps) => (
    <li key={breadcrumb.href} className={styles.breadcrumb}>
      <Link href={breadcrumb.href}>
        <a>{convertBreadcrumb(breadcrumb.title)}</a>
      </Link>
      {(index < breadcrumbs.length - 1 || breadcrumb.title === 'lessons') && (
        <span>
          <ChevronRight />
        </span>
      )}
    </li>
  )

  const homeBreadcrumb = !omitHomeRoute && (
    <Breadcrumb index={0} breadcrumb={{ title: homeTitle, href: '/' }} />
  )

  // TODO: Specific code for Admin page that needs to be refactored
  const LessonsDropdown = () => (
    <li className={styles.breadcrumb}>
      <Dropdown>
        <Dropdown.Toggle bsPrefix={styles.dropdown} id="dropdown-lesson">
          {lessonTitle || 'None'}
          <ChevronRight />
        </Dropdown.Toggle>

        <Dropdown.Menu className={styles.dropdown__menu}>
          {lessons?.map((lesson, index) => (
            <Dropdown.Item
              key={`${lesson}-${index}`}
              onClick={() => setLessonTitle(lesson.title)}
            >
              {lesson.title}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </li>
  )

  return (
    <nav aria-label="breadcrumbs">
      <ol className={styles.breadcrumbs}>
        {homeBreadcrumb}
        {breadcrumbs.map((breadcrumb, index) => (
          <React.Fragment key={`${breadcrumb.title}-${index}`}>
            <Breadcrumb breadcrumb={breadcrumb} index={index} />
            {lowerCase(breadcrumb.title) === 'lessons' && <LessonsDropdown />}
          </React.Fragment>
        ))}
      </ol>
    </nav>
  )
}

export default Breadcrumbs
