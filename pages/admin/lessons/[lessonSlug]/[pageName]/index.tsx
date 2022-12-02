import React, { useMemo, useState } from 'react'
import * as Sentry from '@sentry/react'
import {
  GetAppProps,
  GetAppQuery,
  Lesson,
  useAddModuleMutation,
  useChallengesQuery,
  useCreateChallengeMutation,
  useGetExercisesQuery,
  useModulesQuery,
  useUpdateChallengeMutation,
  useUpdateLessonMutation,
  useUpdateModuleMutation,
  withGetApp
} from '../../../../../graphql'
import AdminLessonSideNav from '../../../../../components/admin/lessons/AdminLessonSideNav'
import AdminLessonInputs from '../../../../../components/admin/lessons/AdminLessonInputs'
import {
  Item,
  Props
} from '../../../../../components/admin/lessons/AdminLessonInputs/AdminLessonInputs'
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
import LoadingSpinner from '../../../../../components/LoadingSpinner'
import AdminLessonExerciseCard from '../../../../../components/admin/lessons/AdminLessonExerciseCard'
import Card from '../../../../../components/Card'
import { Text } from '../../../../../components/theme/Text'
import Link from 'next/link'
import { CURRICULUM_PATH } from '../../../../../constants'

const MAIN_PATH = '/admin/lessons'

enum Pages {
  INTRODUCTION = 'introduction',
  MODULES = 'modules',
  EXERCISE_QUESTION = 'exercises',
  CHALLENGES = 'challenges'
}

type InputItem = Item & {
  id: number
  name: string
  content: string
  lesson: { id?: number }
  order: number
}
type Modules = Item[]

type Challenge = {
  id: number
  description: string
  lessonId: number
  title: string
  order: number
}

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
  const onSelect = (item: Omit<InputItem, 'order'>) => setSelectedIndex(item.id)
  const selectedModule = modules.find(module => module.id === selectedIndex)

  const [mutation, { loading }] =
    selectedIndex === -1 ? useAddModuleMutation() : useUpdateModuleMutation()

  const action = async (options: { variables: Item }) => {
    const { data } = await mutation({
      variables: { ...options.variables, lessonId, id: options.variables.id! }
    })

    return _get(data, 'updateModule') || _get(data, 'addModule')
  }

  return (
    <div className={styles.container__modulesPanel}>
      <AdminLessonSideNav
        items={modules.map(module => ({
          id: module.id!,
          content: module.content,
          lesson: { id: module.lesson?.id },
          name: module.name
        }))}
        onAddItem={onAddItem}
        onSelect={onSelect}
        selectedIndex={selectedIndex}
        itemName="module"
      />
      <div className={styles.container__modulesPanel__inputs}>
        <AdminLessonInputs
          lessonId={lessonId}
          refetch={refetch}
          item={selectedModule}
          action={action}
          loading={loading}
          itemName="module"
        />
      </div>
    </div>
  )
}

type ExercisesProps = { lessonSlug: string }
const ExercisesPage = ({ lessonSlug }: ExercisesProps) => {
  const router = useRouter()

  const { data, loading, refetch } = useGetExercisesQuery()

  if (loading || !router.isReady) return <LoadingSpinner />

  const mapExercisesToExerciseCard = data?.exercises
    .filter(
      exercise =>
        exercise.flaggedAt && exercise.module.lesson.slug === lessonSlug
    )
    .map(exercise => {
      return (
        <AdminLessonExerciseCard
          user={exercise.author}
          exercise={exercise}
          key={exercise.id}
          onRemove={() => refetch()}
          onUnflag={() => refetch()}
        />
      )
    })

  if (!mapExercisesToExerciseCard || !mapExercisesToExerciseCard.length) {
    return (
      <Card title="No exercises found">
        <Text component="p">
          Exercises can be added from{' '}
          <Link href={`${CURRICULUM_PATH}/${lessonSlug}/mentor/addExercise`}>
            <a
              data-testid="addExercise-link"
              style={{ textDecoration: 'none' }}
            >
              <Text color="primary" component="span">
                addExercise page
              </Text>
            </a>
          </Link>
        </Text>
      </Card>
    )
  }

  return (
    <div className={styles.container__exercisesPanel}>
      {mapExercisesToExerciseCard}
    </div>
  )
}

type ChallengesPageProps = {
  lessonId: number
  challenges: GetAppQuery['lessons'][0]['challenges']
  refetch: Props['refetch']
}
const ChallengesPage = ({
  lessonId,
  challenges,
  refetch
}: ChallengesPageProps) => {
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const onAddItem = () => setSelectedIndex(-1)
  const onSelect = (item: Omit<InputItem, 'order'>) => setSelectedIndex(item.id)
  const selectedChallenge = challenges.find(
    challenge => challenge.id === selectedIndex
  )

  const [mutation, { loading }] =
    selectedIndex === -1
      ? useCreateChallengeMutation()
      : useUpdateChallengeMutation()

  const action = async (options: { variables: Item }) => {
    const { data } = await mutation({
      variables: {
        ...options.variables,
        lessonId,
        id: options.variables.id!,
        description: options.variables.content,
        title: options.variables.name
      }
    })

    return _get(data, 'updateChallenge') || _get(data, 'createChallenge')
  }

  return (
    <div className={styles.container__modulesPanel}>
      <AdminLessonSideNav
        itemName="challenge"
        items={challenges.map(challenge => ({
          id: challenge.id,
          name: challenge.title,
          content: challenge.description,
          lesson: { id: lessonId }
        }))}
        onAddItem={onAddItem}
        onSelect={onSelect}
        selectedIndex={selectedIndex}
      />
      <div className={styles.container__modulesPanel__inputs}>
        <AdminLessonInputs
          lessonId={lessonId}
          refetch={refetch}
          item={
            selectedChallenge && {
              id: selectedChallenge.id,
              name: selectedChallenge.title,
              content: selectedChallenge.description,
              lesson: { id: lessonId },
              order: selectedChallenge.order
            }
          }
          action={action}
          loading={loading}
          itemName="challenge"
        />
      </div>
    </div>
  )
}

type ContentProps = {
  pageName?: string | string[]
  modules: Modules
  challenges: Challenge[]
  lessonId: number
  refetchModules: Props['refetch']
  refetchChallenges: Props['refetch']
  lesson: Lesson
}
const Content = ({
  pageName,
  modules,
  challenges,
  lessonId,
  refetchModules,
  refetchChallenges,
  lesson
}: ContentProps) => {
  if (pageName === Pages.MODULES) {
    return (
      <ModulesPage
        lessonId={lessonId}
        refetch={refetchModules}
        modules={modules}
      />
    )
  }

  if (pageName === Pages.EXERCISE_QUESTION) {
    return <ExercisesPage lessonSlug={lesson.slug} />
  }

  if (pageName === Pages.CHALLENGES) {
    return (
      <ChallengesPage
        lessonId={lessonId}
        refetch={refetchChallenges}
        challenges={challenges}
      />
    )
  }

  // The "key" prop is passed so the component update its states (re-render and reset states)
  return <IntroductionPage lesson={lesson} key={lessonId} />
}

const Lessons = ({ data }: GetAppProps) => {
  const router = useRouter()
  const { pageName, lessonSlug } = router.query

  const { lessons } = data
  const { data: challengesData, refetch: refetchChallenges } =
    useChallengesQuery({
      fetchPolicy: 'no-cache'
    })

  const { data: modulesData, refetch: refetchModules } = useModulesQuery({
    fetchPolicy: 'no-cache'
  })

  const lesson = useMemo(() => {
    if (lessons) {
      const lessonFromParam = lessons.find(e => e.slug === lessonSlug)

      if (lessonFromParam)
        return {
          ...lessonFromParam
        }
    }

    return { title: '', slug: '', id: -1, challenges: [] }
  }, [lessons, lessonSlug])

  const filteredModules = useMemo(() => {
    const sortModules = compose(
      sortBy('order'),
      filter((module: InputItem) => module.lesson.id === lesson.id),
      get('modules')
    )

    return sortModules(modulesData)
  }, [lesson.id, get('modules', modulesData)])

  const filteredChallenges = useMemo(() => {
    const sortChallenges = compose(
      sortBy('order'),
      filter((challenge: Challenge) => {
        return challenge.lessonId === lesson.id
      }),
      get('challenges')
    )

    return sortChallenges(challengesData)
  }, [lesson.id, get('challenges', challengesData)])

  const tabs = [
    {
      text: 'introduction',
      url: `${MAIN_PATH}/${lessonSlug}/${Pages.INTRODUCTION}`
    },
    {
      text: 'modules',
      url: `${MAIN_PATH}/${lessonSlug}/${Pages.MODULES}`
    },
    {
      text: 'exercises',
      url: `${MAIN_PATH}/${lessonSlug}/${Pages.EXERCISE_QUESTION}`
    },
    {
      text: 'challenges',
      url: `${MAIN_PATH}/${lessonSlug}/${Pages.CHALLENGES}`
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
            challenges={filteredChallenges}
            lessonId={lesson.id}
            refetchModules={refetchModules}
            refetchChallenges={refetchChallenges}
            lesson={lesson as Lesson}
          />
        </section>
      </main>
    </AdminLayout>
  )
}

export default withGetApp({
  options: {
    // To get newly created lessons when created from /admin/lessons/new page
    fetchPolicy: 'cache-and-network'
  }
})(Lessons)
