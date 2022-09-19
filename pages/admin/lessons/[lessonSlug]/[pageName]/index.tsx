import React, { useMemo, useState } from 'react'
import * as Sentry from '@sentry/react'
import { gql, useQuery } from '@apollo/client'
import {
  GetAppProps,
  Lesson,
  useUpdateLessonMutation,
  withGetApp
} from '../../../../../graphql'
import AdminLessonSideNav from '../../../../../components/admin/lessons/AdminLessonSideNav'
import AdminLessonInputs from '../../../../../components/admin/lessons/AdminLessonInputs'
import { Props } from '../../../../../components/admin/lessons/AdminLessonInputs/AdminLessonInputs'
import Breadcrumbs from '../../../../../components/Breadcrumbs'
import styles from '../../../../../scss/modules.module.scss'
import { AdminLayout } from '../../../../../components/admin/AdminLayout'
import { useRouter } from 'next/router'
import { compose, filter, sortBy, get } from 'lodash/fp'
import { get as _get } from 'lodash'
import NavCard from '../../../../../components/NavCard'
import { FormCard } from '../../../../../components/FormCard'
import { formChange } from '../../../../../helpers/formChange'
import { lessonSchema } from '../../../../../helpers/formValidation'
import {
  getPropertyArr,
  errorCheckAllFields,
  makeGraphqlVariable
} from '../../../../../helpers/admin/adminHelpers'
import QueryInfo from '../../../../../components/QueryInfo'

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

const IntroductionPage = ({ lesson }: { lesson: Lesson }) => {
  const [updateLesson, { data, error, loading }] = useUpdateLessonMutation()

  const [formOptions, setFormOptions] = useState(
    getPropertyArr(lesson, ['challenges', '__typename', 'modules'])
  )

  const handleChange = async (value: string, propertyIndex: number) => {
    await formChange(
      value,
      propertyIndex,
      formOptions,
      setFormOptions,
      lessonSchema
    )
  }

  const onClick = async () => {
    try {
      const newProperties = [...formOptions]
      const valid = await errorCheckAllFields(newProperties, lessonSchema)

      if (!valid) {
        // Update the forms so the error messages appear
        setFormOptions(newProperties)
        return
      }

      await updateLesson(makeGraphqlVariable(formOptions))
    } catch (err) {
      // TODO: Display error with QueryStateMessage #2181
      Sentry.captureException(err)
    }
  }

  return (
    <div>
      <h4>Lesson Info</h4>
      <QueryInfo
        data={data}
        loading={loading}
        error={_get(error, 'message', '')}
        texts={{
          loading: 'Updating the lesson...',
          data: `Updated the lesson successfully!`
        }}
        dismiss={{
          onDismissData: () => {},
          onDismissError: () => {}
        }}
      />
      <div>
        <FormCard
          noBg
          values={formOptions}
          onSubmit={{
            title: 'Save changes',
            onClick
          }}
          onChange={handleChange}
          newBtn
        />
      </div>
    </div>
  )
}

type ModulesPageProps = {
  modules: Modules
  lessonId: number
  refetch: Props['refetch']
}
const ModulesPage = ({ modules, lessonId, refetch }: ModulesPageProps) => {
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const onAddItem = () => setSelectedIndex(-1)
  const onSelect = (item: Omit<Module, 'order'>) => setSelectedIndex(item.id)

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

type ContentProps = {
  pageName?: string | string[]
  modules: Modules
  lessonId: number
  refetch: Props['refetch']
  lesson: Lesson
}
const Content = ({
  pageName,
  modules,
  lessonId,
  refetch,
  lesson
}: ContentProps) => {
  if (pageName === 'modules') {
    return (
      <ModulesPage lessonId={lessonId} refetch={refetch} modules={modules} />
    )
  }

  // The "key" prop is passed so the component update its states (re-render and reset states)
  return <IntroductionPage lesson={lesson} key={lessonId} />
}

const Lessons = ({ data }: GetAppProps) => {
  const router = useRouter()
  const { pageName, lessonSlug } = router.query

  const { lessons } = data
  const { data: modulesData, refetch } = useQuery<{ modules: Modules }>(
    MODULES,
    { fetchPolicy: 'no-cache' }
  )

  const lesson = useMemo(() => {
    if (lessons) {
      const lessonFromParam = lessons.find(e => e.slug === lessonSlug)

      if (lessonFromParam)
        return {
          ...lessonFromParam
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

  const tabs = [
    {
      text: 'introduction',
      url: `${MAIN_PATH}/${lessonSlug}/introduction`
    },
    {
      text: 'modules',
      url: `${MAIN_PATH}/${lessonSlug}/modules`
    }
  ]
  const tabSelected = tabs.findIndex(tab => tab.text === pageName)

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
          <NavCard
            tabSelected={tabSelected < 0 ? 0 : tabSelected}
            tabs={tabs}
          />
        </section>
        <section>
          <Content
            pageName={pageName}
            modules={filteredModules}
            lessonId={lesson.id}
            refetch={refetch}
            lesson={lesson as Lesson}
          />
        </section>
      </main>
    </AdminLayout>
  )
}

export default withGetApp()(Lessons)
