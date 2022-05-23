import { gql, useQuery } from '@apollo/client'
import { GetAppProps, withGetApp } from '../../../../graphql'
import { get, sortBy } from 'lodash'
import React, { useEffect, useMemo, useState } from 'react'
import AdminLessonNav from '../../../../components/admin/lessons/AdminLessonNav'
import AdminLessonSideNav from '../../../../components/admin/lessons/AdminLessonSideNav'
import AdminModuleInputs, {
  Props
} from '../../../../components/admin/lessons/AdminModuleInputs'
import Breadcrumbs from '../../../../components/Breadcrumbs'
import Layout from '../../../../components/Layout'
import styles from '../../../../scss/modules.module.scss'
import { AdminLayout } from '../../../../components/admin/AdminLayout'

const MODULES = gql`
  query {
    modules {
      id
      name
      content
      lesson {
        id
      }
    }
  }
`

type Module = {
  id: number
  name: string
  content: string
  lesson: { id?: number }
}
type Modules = Module[]

type ModulesPanelProps = {
  filteredModules: Modules
  lessonId: number
  refetch: Props['refetch']
}

const modulesPanel = ({
  filteredModules,
  lessonId,
  refetch
}: ModulesPanelProps) => ({
  tabName: 'Modules',
  tabComponent: () => {
    const [selectedIndex, setSelectedIndex] = useState(-1)
    const onAddItem = () => setSelectedIndex(-1)
    const onSelect = (item: Module) => setSelectedIndex(item.id)

    useEffect(() => setSelectedIndex(filteredModules[0]?.id), [lessonId])

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
})

const Lessons = ({ data }: GetAppProps) => {
  const { lessons } = data
  const { data: modulesData, refetch } = useQuery<{ modules: Modules }>(MODULES)

  const [lesson, setLesson] = useState({ title: '', id: -1 })
  const [modules, setModules] = useState(sortBy(modulesData?.modules, 'name'))

  const filteredModules = modules.filter(
    module => module.lesson.id === lesson.id
  )

  const panels = useMemo(
    () => [
      modulesPanel({
        filteredModules,
        refetch,
        lessonId: lesson.id
      })
    ],
    [lesson.id, filteredModules]
  )

  useEffect(() => {
    setModules(sortBy(modulesData?.modules, 'name'))
  }, [modulesData])

  useEffect(() => {
    setLesson(get(lessons, [0], { title: '', id: -1 }))
  }, [lessons])

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
          <AdminLessonNav panels={panels} />
        </section>
      </main>
    </AdminLayout>
  )
}

export default withGetApp()(Lessons)
