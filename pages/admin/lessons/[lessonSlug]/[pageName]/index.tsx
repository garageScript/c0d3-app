import { gql, useQuery } from '@apollo/client'
import { GetAppProps, withGetApp } from '../../../../../graphql'
import { toUpper } from 'lodash'
import React, { useMemo, useState } from 'react'
import AdminLessonNav from '../../../../../components/admin/lessons/AdminLessonSideNavLayout'
import AdminLessonSideNav from '../../../../../components/admin/lessons/AdminLessonSideNav'
import AdminLessonInputs, {
  Props
} from '../../../../../components/admin/lessons/AdminLessonInputs'
import Breadcrumbs from '../../../../../components/Breadcrumbs'
import styles from '../../../../../scss/modules.module.scss'
import navStyles from '../../../../../scss/adminLessonNav.module.scss'
import { AdminLayout } from '../../../../../components/admin/AdminLayout'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { compose, filter, get, sortBy } from 'lodash/fp'

const MAIN_PATH = '/admin/lessons'

const MODULES = gql`
  query {
    modules {
      id
      name
      content
      lesson {
        id
      }
      order
    }
  }
`

type Module = {
  id: number
  name: string
  content: string
  lesson: { id?: number }
  order: number
}
type Modules = Module[]

type ContentProps = {
  pageName?: string | string[]
  modules: Modules
  lessonId: number
  refetch: Props['refetch']
}

const Content = ({ pageName, modules, lessonId, refetch }: ContentProps) => {
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const onAddItem = () => setSelectedIndex(-1)
  const onSelect = (item: Omit<Module, 'order'>) => setSelectedIndex(item.id)

  if (pageName !== 'modules') {
    return (
      <h1>
        For now, you can only access <code>/modules</code> page
      </h1>
    )
  }

  return (
    <div className={styles.container__modulesPanel}>
      <AdminLessonSideNav
        title="Modules"
        items={modules}
        onAddItem={onAddItem}
        onSelect={onSelect}
        selectedIndex={selectedIndex}
      />
      <div className={styles.container__modulesPanel__inputs}>
        <AdminLessonInputs
          lessonId={lessonId}
          refetch={refetch}
          module={modules.find(module => module.id === selectedIndex)}
        />
      </div>
    </div>
  )
}

const Lessons = ({ data }: GetAppProps) => {
  const router = useRouter()
  const { pageName, lessonSlug } = router.query

  const { lessons } = data
  const { data: modulesData, refetch } = useQuery<{ modules: Modules }>(MODULES)

  const lesson = useMemo(() => {
    if (lessons) {
      const lessonFromParam = lessons.find(e => e.slug === lessonSlug)

      if (lessonFromParam)
        return {
          title: lessonFromParam.title,
          slug: lessonFromParam.slug,
          id: lessonFromParam.id
        }
    }

    return { title: '', slug: '', id: -1 }
  }, [lessons, lessonSlug])

  const filteredModules = useMemo(() => {
    const sortModules = compose(
      sortBy('order'),
      filter((module: Module) => module.lesson.id === lesson.id),
      get('modules')
    )

    return sortModules(modulesData)
  }, [lesson.id, get('modules', modulesData)])

  const LessonNav = ({
    tab
  }: {
    tab: { tabName: string; urlPageName: string }
  }) => {
    const isSelected = tab.urlPageName === pageName
    const className =
      navStyles[
        isSelected
          ? 'lessons_tabsNav__nav__item'
          : 'lessons_tabsNav__nav__item--inactive'
      ]

    return (
      <Link href={`${MAIN_PATH}/${lessonSlug}/${tab.urlPageName}`}>
        <a className={`${className} nav-pills`}>{toUpper(tab.tabName)}</a>
      </Link>
    )
  }

  return (
    <AdminLayout data={data}>
      <main className={styles.container}>
        <header>
          <h1>Lesson Info</h1>
          <Breadcrumbs
            lesson={lesson}
            setLesson={lesson => {
              router.push(`${MAIN_PATH}/${lesson.slug}/${pageName}`)
            }}
            lessons={lessons}
          />
        </header>
        <section>
          <AdminLessonNav
            tabs={[
              {
                tabName: 'modules',
                urlPageName: 'modules'
              }
            ]}
            Component={LessonNav}
          />
        </section>
        <section>
          <Content
            pageName={pageName}
            modules={filteredModules}
            lessonId={lesson.id}
            refetch={refetch}
          />
        </section>
      </main>
    </AdminLayout>
  )
}

export default withGetApp()(Lessons)
