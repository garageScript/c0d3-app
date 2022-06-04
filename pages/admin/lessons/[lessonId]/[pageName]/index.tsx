import { gql, useQuery } from '@apollo/client'
import { GetAppProps, withGetApp } from '../../../../../graphql'
import { get, sortBy, toNumber, toUpper } from 'lodash'
import React, { useEffect, useMemo, useState } from 'react'
import AdminLessonNav from '../../../../../components/admin/lessons/AdminLessonNav'
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

type ModulesTabProps = {
  filteredModules: Modules
  lessonId: number
  refetch: Props['refetch']
}

const ModulesTab = ({
  filteredModules,
  lessonId,
  refetch
}: ModulesTabProps) => {
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const onAddItem = () => setSelectedIndex(-1)
  const onSelect = (item: Omit<Module, 'order'>) => setSelectedIndex(item.id)

  useEffect(() => setSelectedIndex(get(filteredModules[0], 'id')), [lessonId])

  return (
    <div className={styles.container__modulesPanel}>
      <AdminLessonSideNav
        title="Modules"
        items={filteredModules}
        onAddItem={onAddItem}
        onSelect={onSelect}
        selectedIndex={selectedIndex}
      />
      <div className={styles.container__modulesPanel__inputs}>
        <AdminModuleInputs
          lessonId={lessonId}
          refetch={refetch}
          module={filteredModules.find(module => module.id === selectedIndex)}
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

  const [lesson, setLesson] = useState({
    title: '',
    id: -1
  })
  const [modules, setModules] = useState(
    sortBy(get(modulesData, 'modules'), 'order')
  )

  const filteredModules = useMemo(
    () => modules.filter(module => module.lesson.id === lesson.id),
    [lesson.id, modules]
  )

  useEffect(() => {
    setModules(sortBy(get(modulesData, 'modules'), 'order'))
  }, [get(modulesData, 'modules')])

  useEffect(() => {
    if (lessons) {
      const lessonFromParam = lessons.find(e => e.id === toNumber(lessonId))

      setLesson(
        lessonFromParam
          ? {
              title: lessonFromParam.title,
              id: lessonFromParam.id
            }
          : { title: '', id: -1 }
      )
    }
  }, [lessons, lessonId])

  const modulesTab = useMemo(
    () => (
      <ModulesTab
        filteredModules={filteredModules}
        lessonId={lesson.id}
        refetch={refetch}
      />
    ),
    [pageName, lessonId, filteredModules, lesson.id]
  )

  const renderPage = () => {
    if (pageName === 'modules') return modulesTab

    return (
      <h1>
        For now, you can only access <code>/modules</code> page
      </h1>
    )
  }

  return (
    <AdminLayout data={data}>
      <main className={styles.container}>
        <header>
          <h1>Lesson Info</h1>
          <Breadcrumbs
            lesson={lesson}
            setLesson={setLesson}
            lessons={lessons}
          />
        </header>
        <section>
          <AdminLessonNav
            tabs={[
              {
                tabName: 'modules',
                urlPageName: 'modules'
              },
              {
                tabName: 'exercises',
                urlPageName: 'exercises'
              }
            ]}
            render={navItem => {
              const isSelected = navItem.urlPageName === pageName
              const className =
                navStyles[
                  isSelected
                    ? 'lessons_tabsNav__nav__item'
                    : 'lessons_tabsNav__nav__item--inactive'
                ]

              return (
                <Link href={`/admin/lessons/1/${navItem.urlPageName}`}>
                  <a className={`${className} nav-pills`}>
                    {toUpper(navItem.tabName)}
                  </a>
                </Link>
              )
            }}
          />
        </section>
        <section>{renderPage()}</section>
      </main>
    </AdminLayout>
  )
}

export default withGetApp()(Lessons)
