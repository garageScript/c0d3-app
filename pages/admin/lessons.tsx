import React, { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import _ from 'lodash'
import Layout from '../../components/Layout'
import LoadingSpinner from '../../components/LoadingSpinner'
import getLessons from '../../graphql/queries/getLessons'
import createNewLesson from '../../graphql/queries/createLesson'
import updateLesson from '../../graphql/queries/updateLesson'
import updateChallenge from '../../graphql/queries/updateChallenge'
import checkAdminRights from '../../graphql/queries/checkAdminRights'
import { Button } from '../../components/theme/Button'
import { MdInput } from '../../components/MdInput'
const capitalizeFirst = (str: string) =>
  str.replace(/./, char => char.toUpperCase())
type LessonInfoProps = {
  lessons: any
  setLessons: any
  test: number
}
type AdminLessonProps = {
  lessons: any
  setLessons: any
}

type SideBarLessonProps = {
  lessons: any
  setLessons: any
  setTest: any
}

const makeLessonsList = (lessons: any, setTest: any) => {
  const lessonList = lessons.map((e: { title: string }, i: number) => {
    return (
      <div key={i} data-testid="challenge-title" className="card mb-2">
        <div className="btn d-flex justify-content-center">
          <div
            style={{ margin: 0, wordBreak: 'break-word' }}
            onClick={() => setTest(i)}
          >
            <h4 style={{ margin: 0, wordBreak: 'break-word' }}>{e.title}</h4>
          </div>
        </div>
      </div>
    )
  })

  const lastSpot = lessonList.length

  lessonList.push(
    <div key={lastSpot} data-testid="challenge-title" className={`card mb-2 `}>
      <div className="btn d-flex justify-content-center">
        <div
          style={{
            margin: 0,
            wordBreak: 'break-word'
          }}
          onClick={() => setTest(lastSpot)}
        >
          <h4 style={{ margin: 0, wordBreak: 'break-word' }}>
            Create New Lesson
          </h4>
        </div>
      </div>
    </div>
  )
  return lessonList
}

//test contains order, so do lessons.lessons[order] to get correct lesson info for lessinINfo
const SideBar: React.FC<SideBarLessonProps> = ({ lessons, setTest }) => {
  let lessonsArr: any = [<h1 key={0}>Create new Lesson</h1>]
  if (lessons) {
    lessonsArr = makeLessonsList(lessons, setTest)
  }
  return <div className="col-4">{lessonsArr}</div>
}

type InputCardProps = {
  values: any
  buttons: any
  capitalizeTitle?: boolean
  title?: string
}

// need to add title prop for 'overall title'
const InputCard: React.FC<InputCardProps> = ({
  values,
  buttons,
  capitalizeTitle = true,
  title
}) => {
  const [options, saveOptions] = useState(values)
  const titles = Object.keys(values)

  // needed so that lesson info correctly update `options` state when someone  passes new `values` value in
  useEffect(() => {
    saveOptions(values)
  }, [values])
  const inputs = titles.map((title, i) => {
    if (title === 'id') return []
    //if it is a descriptoin title, i wwant to use mdcomponent
    return (
      <div
        key={i}
        className="input-group d-flex .flex-col"
        style={{
          padding: 10,
          backgroundColor: 'rgb(84, 64, 216, .04)',
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'left',
          marginBottom: i === titles.length - 1 ? 0 : 10
        }}
      >
        <h5>{(capitalizeTitle && capitalizeFirst(title)) || title}</h5>
        {title === 'description' && (
          <React.Fragment>
            <MdInput
              bgColor="white"
              value={options[title] || ''}
              onChange={(value: string) => {
                const newOptions = { ...options }
                newOptions[title] = value
                saveOptions(newOptions)
              }}
            />
          </React.Fragment>
        )}
        {title !== 'description' && (
          <input
            style={{
              border: '1px solid rgb(84, 64, 216, .3)'
            }}
            type="text"
            value={options[title]}
            onChange={e => {
              const newOptions = { ...options }
              newOptions[title] = e.target.value
              saveOptions(newOptions)
            }}
            className="form-control"
            placeholder=""
            aria-label=""
            aria-describedby="basic-addon1"
          />
        )}
        <div className="input-group-append"></div>
      </div>
    )
  })

  const btnsList = Object.keys(buttons)

  const btns = btnsList.map((title: string, i: number) => {
    return (
      <div style={{ display: 'inline-block', margin: 10 }} key={i}>
        <Button
          onClick={() => {
            buttons[title] && buttons[title](options)
          }}
          type="success"
        >
          {title}
        </Button>
      </div>
    )
  })

  return (
    <div
      style={{
        textAlign: 'center',
        padding: 10,
        backgroundColor: 'white'
      }}
    >
      {title && <h2 style={{ textDecoration: 'underline' }}>{title}</h2>}
      {inputs}
      {btns}
    </div>
  )
}

type LessonBaseProps = {
  setLessons: any
  lesson: any
}

const LessonBase: React.FC<LessonBaseProps> = ({ setLessons, lesson }) => {
  const [alterLesson, { loading, data }] = useMutation(updateLesson)

  useEffect(() => {
    !loading && data && setLessons(data.updateLessons)
  }, [data])

  const alter = async (options: any) => {
    const {
      title,
      description,
      docUrl,
      githubUrl,
      videoUrl,
      order,
      chatUrl
    } = options
    try {
      await alterLesson({
        variables: {
          id: parseInt(lesson.id),
          title,
          description,
          docUrl,
          githubUrl,
          videoUrl,
          order,
          chatUrl
        }
      })
    } catch (err) {
      throw new Error(err)
    } // catch error that's thrown by default from mutation
  }
  const lessonInputs = { ...lesson }
  delete lessonInputs.id
  delete lessonInputs['__typename']
  delete lessonInputs.challenges
  return (
    <React.Fragment>
      <h1 style={{ margin: 15, color: '#5440d8', fontSize: '3.6rem' }}>
        Lesson Info
      </h1>
      <div style={{ textAlign: 'center' }} className="card">
        <InputCard
          values={lessonInputs}
          buttons={{ 'Update Lesson': alter }}
          title={lesson.title}
        />
      </div>
    </React.Fragment>
  )
}

type LessonChallengesProps = {
  setLessons: any
  challenges: any
  lessonId?: number
}

const LessonChallenges: React.FC<LessonChallengesProps> = ({
  setLessons,
  challenges,
  lessonId
}) => {
  const [alterChallenge, { loading, data }] = useMutation(updateChallenge)

  useEffect(() => {
    !loading && data && setLessons(data.updateChallenge)
  }, [data])

  const alters = async (options: any) => {
    const { title, description, order, id } = options
    try {
      await alterChallenge({
        variables: {
          id: parseInt(id),
          lessonId,
          order,
          description,
          title
        }
      })
    } catch (err) {
      throw new Error(err)
    } // catch error that's thrown by default from mutation
  }
  let allChallenges = []
  if (challenges) {
    allChallenges = challenges.map((e: any, i: number) => {
      const challenge = { ...e }
      delete challenge['__typename']
      if (challenge.hasOwnProperty('lessonId')) delete challenge['lessonId']
      return (
        <div className="card" style={{ marginBottom: 20 }} key={i}>
          <InputCard
            title={e.title}
            values={challenge}
            buttons={{ 'Update Challenge': alters }}
          />
        </div>
      )
    })
  }
  return <div>{allChallenges}</div>
}

const getAttributes: any = (lesson: any) => {
  if (lesson.challenges) delete lesson.challenges
  if (lesson['__typename']) delete lesson['__typename']
  const attributes = Object.keys(lesson)
  const res = attributes.reduce((acc: any, e: any) => {
    acc[e] = ''
    return acc
  }, {})
  return res
}

type NewLessonProps = {
  lesson: any
  setLessons: any
}

const NewLesson: React.FC<NewLessonProps> = ({ lesson, setLessons }) => {
  if (!lesson) return <h1>ok</h1>
  const [createLesson, { loading, data }] = useMutation(createNewLesson)
  useEffect(() => {
    !loading && data && setLessons(data.createLesson)
    console.log(data)
  }, [data])

  const alter = async (options: any) => {
    let {
      title,
      description,
      docUrl,
      githubUrl,
      videoUrl,
      order,
      chatUrl
    } = options
    order = parseInt(order)
    try {
      await createLesson({
        variables: {
          title,
          description,
          docUrl,
          githubUrl,
          videoUrl,
          order,
          chatUrl
        }
      })
    } catch (err) {
      throw new Error(err)
    } // catch error that's thrown by default from mutation
  }

  const attributes = getAttributes(lesson)

  return (
    <div style={{ textAlign: 'center' }} className="col-8">
      <div className="card" style={{ marginBottom: 20 }}>
        <h1 style={{ margin: 15, color: '#5440d8', fontSize: '3.6rem' }}>
          Create New Lesson
        </h1>
        <InputCard values={attributes} buttons={{ 'Create Lesson': alter }} />
      </div>
    </div>
  )
}

const LessonInfo: React.FC<LessonInfoProps> = ({
  setLessons,
  lessons,
  test
}) => {
  if (test === lessons.length) {
    return <NewLesson lesson={lessons[0]} setLessons={setLessons} />
  }
  const lesson = lessons[test]
  return (
    <div style={{ textAlign: 'center' }} className="col-8">
      <LessonBase setLessons={setLessons} lesson={lesson} />
      <hr />
      <h1 style={{ margin: 15, color: '#5440d8', fontSize: '3.6rem' }}>
        Lesson Challenges
      </h1>
      <LessonChallenges
        challenges={lesson.challenges}
        lessonId={parseInt(lesson.id)}
        setLessons={setLessons}
      />
    </div>
  )
}

const AdminLessons: React.FC<AdminLessonProps> = ({ lessons, setLessons }) => {
  const [test, setTest] = useState(0)
  return (
    <Layout>
      <div className="row mt-4">
        <SideBar setLessons={setLessons} lessons={lessons} setTest={setTest} />
        <LessonInfo setLessons={setLessons} lessons={lessons} test={test} />
      </div>
    </Layout>
  )
}

const LoadLessons: React.FC = () => {
  const { loading, error, data } = useQuery(getLessons)
  const [lessons, setLessons] = useState(null)

  return (
    <React.Fragment>
      {loading && <LoadingSpinner />}
      {error && <h1>Error</h1>}
      {data && (
        <AdminLessons
          lessons={lessons || data.lessons}
          setLessons={setLessons}
        />
      )}
    </React.Fragment>
  )
}

const Lessons = () => {
  const { loading, error, data } = useQuery(checkAdminRights)

  return (
    <React.Fragment>
      {loading && <LoadingSpinner />}
      {error && <h1>Error</h1>}
      {data && data.adminRights && <LoadLessons />}]
    </React.Fragment>
  )
}

export default Lessons
