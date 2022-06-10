import { gql, useQuery } from '@apollo/client'
import { GetAppProps, withGetApp } from '../../../../../graphql'
import { get, sortBy, toNumber, toUpper } from 'lodash'
import React, { useMemo, useState } from 'react'
import AdminLessonNav from '../../../../../components/admin/lessons/AdminLessonSideNavLayout'
import AdminLessonSideNav from '../../../../../components/admin/lessons/AdminLessonSideNav'
import AdminModuleInputs, {
  Props
} from '../../../../../components/admin/lessons/AdminModuleInputs'
import Breadcrumbs from '../../../../../components/Breadcrumbs'
import styles from '../../../../../scss/modules.module.scss'
import navStyles from '../../../../../scss/adminLessonNav.module.scss'
import { AdminLayout } from '../../../../../components/admin/AdminLayout'
import { useRouter } from 'next/router'
import Link from 'next/link'

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

const extractLessonOrder = (x: string) => x.split('').slice(2).join()

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
        <AdminModuleInputs
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
  const { pageName, lessonId } = router.query

  const { lessons } = data
  const { data: modulesData, refetch } = useQuery<{ modules: Modules }>(MODULES)

  const lesson = useMemo(() => {
    if (lessons) {
      const lessonFromParam = lessons.find(
        e => toNumber(extractLessonOrder(e.slug)) === toNumber(lessonId)
      )

      if (lessonFromParam)
        return {
          title: lessonFromParam.title,
          slug: lessonFromParam.slug,
          id: lessonFromParam.id
        }
    }

    return { title: '', slug: '', id: -1 }
  }, [lessons, lessonId])

  const modules = useMemo(
    () => sortBy(get(modulesData, 'modules'), 'order'),
    [modulesData]
  )

  const filteredModules = useMemo(
    () => modules.filter(module => module.lesson.id === lesson.id),
    [lesson.id, modules]
  )

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
      <Link href={`${MAIN_PATH}/${lessonId}/${tab.urlPageName}`}>
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
              router.push(
                `${MAIN_PATH}/${extractLessonOrder(lesson.slug)}/${pageName}`
              )
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
