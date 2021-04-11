import * as React from 'react'
import Layout from '../components/Layout'
import Error, { StatusCode } from '../components/Error'
import LessonCard from '../components/LessonCard'
import ProgressCard from '../components/ProgressCard'
import AnnouncementCard from '../components/AnnouncementCard'
import AdditionalResources from '../components/AdditionalResources'
import AlertsDisplay from '../components/AlertsDisplay'
import {
  GetAppQuery,
  GetAppDocument,
  Lesson,
  Alert,
  Session,
  UserLesson,
  useGetSessionQuery
} from '../graphql/'
import _ from 'lodash'
import { initializeApollo } from '../helpers/apolloClient'
import { GetStaticProps } from 'next'

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
  session: Session
  progress: number
  current: number
}
const generateMap = (session: Session): { [id: string]: UserLesson } => {
  const { lessonStatus } = session
  const lessonStatusMap: { [id: string]: UserLesson } = {}
  for (const status of lessonStatus) {
    const lessonId = _.get(status, 'lessonId', '-1') as string
    lessonStatusMap[lessonId] = status
  }
  return lessonStatusMap
}
const calculateProgress = (session: Session, lessons: Lesson[]): number => {
  const lessonStatusMap = generateMap(session)
  const lessonInProgressIdx = _.cond([
    [_.isEqual.bind(null, -1), _.constant(0)],
    [_.constant(true), (output: number) => output]
  ])(
    lessons.findIndex(lesson => {
      const lessonId = _.get(lesson, 'id', '-1') as string
      const passed = _.get(lessonStatusMap[lessonId], 'isPassed', false)
      return !passed
    })
  )
  // Progress Percentage should be calculated from lessons 0-6 because thats our current standard of finishing the curriculum.
  const TOTAL_LESSONS = 7
  return Math.floor((lessonInProgressIdx * 100) / TOTAL_LESSONS)
}
const calculateCurrent = (session: Session, lessons: Lesson[]): number => {
  const lessonStatusMap = generateMap(session)
  return _.cond([
    [_.isEqual.bind(null, -1), _.constant(0)],
    [_.constant(true), (output: number) => output]
  ])(
    lessons.findIndex(lesson => {
      const lessonId = _.get(lesson, 'id', '-1') as string
      const passed = _.get(lessonStatusMap[lessonId], 'isPassed', false)
      return !passed
    })
  )
}
const DiscordWidget = () => (
  <iframe
    className="mt-3 w-100"
    src="https://discord.com/widget?id=828783458469675019&theme=light"
    height="500"
    allowTransparency
    frameBorder="0"
    sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
  ></iframe>
)
export const Curriculum: React.FC<Props> = ({ lessons, alerts }) => {
  const { data } = useGetSessionQuery({ fetchPolicy: 'cache-and-network' })
  const [state, setState] = React.useState<State>({
    session: { lessonStatus: [] },
    progress: -1,
    current: -1
  })
  if (!lessons || !alerts) {
    return <Error code={StatusCode.INTERNAL_SERVER_ERROR} message="Bad data" />
  }
  React.useEffect(() => {
    if (data && data.session) {
      setState({
        session: data.session,
        progress: calculateProgress(data.session, lessons),
        current: calculateCurrent(data.session, lessons)
      })
    }
  }, [data])
  const lessonStatusMap = generateMap(state.session)
  const lessonsToRender: React.ReactElement[] = lessons.map((lesson, idx) => {
    const id = _.get(lesson, 'id', idx) as number
    const status = lessonStatusMap[id]
    let lessonState = ''
    if (idx === state.current) {
      lessonState = 'inProgress'
    }
    const passed = _.get(status, 'isPassed', false)
    if (passed) {
      lessonState = 'completed'
    }
    const title = _.get(lesson, 'title', '') as string
    const challengeCount = _.get(lesson, 'challenges.length', 0) as number
    const description = _.get(lesson, 'description', '') as string
    return (
      <LessonCard
        key={id}
        lessonId={id}
        coverImg={`js-${idx}-cover.svg`}
        title={title}
        challengeCount={challengeCount}
        description={description}
        currentState={lessonState}
        reviewUrl={`/review/${id}`}
        challengesUrl={`/curriculum/${id}`}
        docUrl={_.get(lesson, 'docUrl', '') as string}
      />
    )
  })
  return (
    <Layout>
      <div className="row">
        <AlertsDisplay alerts={alerts} page="curriculum" />
        <div className="col-xl-8 order-xl-0 order-1">{lessonsToRender}</div>
        <div className="col-xl-4">
          <div className="d-xl-block">
            <DiscordWidget />
            <ProgressCard progressCount={state.progress} />
          </div>
          <div className="d-none d-xl-block">
            <AnnouncementCard announcements={announcements} />
            <AdditionalResources />
          </div>
        </div>
      </div>
    </Layout>
  )
}
export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo()
  const query = await apolloClient.query<GetAppQuery>({
    query: GetAppDocument
  })

  return {
    props: {
      lessons: query.data.lessons,
      alerts: query.data.alerts
    }
  }
}
export default Curriculum
