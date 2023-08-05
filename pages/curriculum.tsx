import _ from 'lodash'
import { GetStaticProps } from 'next'
import React, { useEffect, useRef, useState } from 'react'
import { ArrayElement } from '../@types/utils'
import AdditionalResources from '../components/AdditionalResources/'
import AlertsDisplay from '../components/AlertsDisplay'
import AnnouncementCard from '../components/AnnouncementCard'
import DiscordBar from '../components/DiscordBar'
import Error, { StatusCode } from '../components/Error'
import Layout from '../components/Layout'
import LessonCard from '../components/LessonCard'
import ProgressCard from '../components/ProgressCard'
import ConnectToDiscordModal from '../components/ConnectToDiscordModal'
import {
  Alert,
  GetAppDocument,
  GetAppQuery,
  GetSessionQuery,
  Lesson,
  useGetSessionQuery
} from '../graphql/'
import { initializeApollo } from '../helpers/apolloClient-server'
import styles from '../scss/curriculum.module.scss'
import useHasMounted from '../helpers/useHasMounted'

const announcements = [
  'To make space for other students on our servers, your account will be deleted after 30 days of inactivity.',
  'Take each lesson challenge seriously and do them over and over again until you can solve them. With the exception End to End, all challenges are questions and exercises taken from real interviews.',
  'These lessons will not only prepare you for interviews, but it will also help teach you the skills that you need to become an effective engineer.',
  'After completing Foundations of JavaScript, Variables & Functions, Array, Objects, End to End, HTML/CSS/JavaScript, React/GraphQL/SocketIO, you will be ready to contribute to our codebase.'
]
type Props = {
  lessons: Lesson[]
  alerts: Alert[]
}

interface State {
  session: GetSessionQuery['session']
  progress: number
  current: number
}

const generateMap = (
  session: GetSessionQuery['session']
): { [id: string]: ArrayElement<typeof session.lessonStatus> } => {
  return session.lessonStatus.reduce(
    (map, userLesson) => {
      map[userLesson.lessonId] = userLesson
      return map
    },
    {} as ReturnType<typeof generateMap>
  )
}

// Progress Percentage should be calculated from lessons 0-6 because thats our current standard of finishing the curriculum.
const TOTAL_LESSONS = 7

const calculateProgress = (
  session: GetSessionQuery['session'],
  lessons: Lesson[]
): number => {
  const lessonInProgressIdx = calculateCurrent(session, lessons)
  return Math.floor((lessonInProgressIdx * 100) / TOTAL_LESSONS)
}

/**
 * Finds the index of the first uncompleted lesson
 * @param session
 * @param lessons
 * @returns current lesson index
 */
const calculateCurrent = (
  session: GetSessionQuery['session'],
  lessons: Lesson[]
): number => {
  const lessonStatusMap = generateMap(session)
  const lessonIndex = lessons.findIndex(
    ({ id }) => Boolean(lessonStatusMap[id]?.passedAt) === false
  )
  // findIndex returns -1 if an element is not found
  return Math.max(0, lessonIndex)
}

const ScrollArrow: React.FC<{ scrolledRight: boolean }> = ({
  scrolledRight
}) => {
  return (
    <img
      src={`/assets/curriculum/icons/scroll-${
        scrolledRight ? 'left' : 'right'
      }.svg`}
      className={`${styles['arrow']} ${
        scrolledRight && styles['right']
      } position-fixed d-xl-none`}
      data-testid="arrow"
    />
  )
}
export const Curriculum: React.FC<Props> = ({ lessons, alerts }) => {
  const hasMounted = useHasMounted()
  //fallback in case if localStorage (which is used by persistent cache) is disabled
  const { data, loading } = useGetSessionQuery({
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-and-network',
    ssr: false
  })
  const [state, setState] = useState<State>({
    session: { lessonStatus: [] },
    progress: -1,
    current: -1
  })
  const [showConnectToDiscordModal, setShowConnectToDiscordModal] =
    useState(false)

  if (!lessons || !alerts) {
    return <Error code={StatusCode.INTERNAL_SERVER_ERROR} message="Bad data" />
  }
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [scrolledRight, setScrolledRight] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      /*istanbul ignore else*/
      if (scrollContainerRef.current) {
        const status = scrollContainerRef.current.scrollLeft / window.innerWidth
        if (status > 0.9) {
          setScrolledRight(true)
          window.localStorage.setItem('horizontalScrollUsed', 'true')
        }
        if (status < 0.1) setScrolledRight(false)
      }
    }
    scrollContainerRef.current &&
      scrollContainerRef.current.addEventListener(
        'scroll',
        _.throttle(onScroll)
      )
  }, [])
  useEffect(() => {
    if (data && data.session) {
      if (data.session.user && !data.session.user.isConnectedToDiscord) {
        setShowConnectToDiscordModal(true)
      }
      setState({
        session: data.session,
        progress: calculateProgress(data.session, lessons),
        current: calculateCurrent(data.session, lessons)
      })
    }
  }, [data])

  const lessonStatusMap = generateMap(state.session)
  const lessonsToRender: React.ReactElement[] = lessons.map((lesson, idx) => {
    const { id, title, description, challenges, docUrl, slug } = lesson
    const status = lessonStatusMap[id]
    const passed = Boolean(status?.passedAt)
    let lessonState = ''
    if (idx === state.current) lessonState = 'inProgress'
    if (passed) lessonState = 'completed'

    return (
      <LessonCard
        key={id}
        lessonId={id}
        coverImg={`js-${idx}-cover.svg`}
        title={title}
        challengeCount={challenges.length}
        description={description}
        currentState={lessonState}
        reviewUrl={`/review/${slug}`}
        challengesUrl={`/curriculum/${slug}`}
        docUrl={docUrl ?? ''}
      />
    )
  })
  return (
    <>
      <ConnectToDiscordModal
        show={showConnectToDiscordModal}
        close={() => setShowConnectToDiscordModal(false)}
      />
      <Layout title="Curriculum">
        {hasMounted &&
          typeof window !== 'undefined' &&
          !window.localStorage.getItem('horizontalScrollUsed') && (
            <ScrollArrow scrolledRight={scrolledRight} />
          )}
        <div
          className={`row overflow-auto flex-nowrap ${styles['parent-scroll']}`}
          ref={scrollContainerRef}
          data-testid="parent-scroll"
        >
          <div className={`col-12 col-xl-8 ${styles['child-scroll']}`}>
            <AlertsDisplay alerts={alerts} page="curriculum" />
            <div className="d-xl-none">
              <ProgressCard
                progressCount={state.progress}
                loggedIn={!!state.session?.user}
                loading={loading}
              />
            </div>
            {lessonsToRender}
          </div>
          <div className={`col-12 col-xl-4 ${styles['child-scroll']}`}>
            <DiscordBar />
            <div className="d-none d-xl-block">
              <ProgressCard
                progressCount={state.progress}
                loggedIn={!!state.session?.user}
                loading={loading}
              />
            </div>
            <AnnouncementCard announcements={announcements} />
            <AdditionalResources />
          </div>
        </div>
      </Layout>
    </>
  )
}
const FIVE_MINUTES = 5 * 60

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo()
  const query = await apolloClient.query<GetAppQuery>({
    query: GetAppDocument
  })

  return {
    props: {
      lessons: query.data.lessons,
      alerts: query.data.alerts
    },
    revalidate: FIVE_MINUTES
  }
}

export default Curriculum
