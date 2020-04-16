import * as React from 'react'
import AppNav from '../components/AppNav'
import Footer from '../components/Footer'
import useSWR from 'swr'

import { useQuery } from '@apollo/react-hooks'
import { GET_LESSONS } from '../graphql/queries'

const SERVER_URL = process.env.SERVER_URL

export const fetcher = (url: string) =>
  fetch(url, { credentials: 'include' }).then(r => r.json())

const AdminPage: any = () => {
  const { data: userData, error: userError } = useSWR(
    `${SERVER_URL}/session`,
    fetcher
  )
  const { loading: lessonsLoading, data: lessonsData } = useQuery(GET_LESSONS)

  if ((!userData && !userError) || lessonsLoading) {
    return <h1>Loading...</h1>
  }

  console.log(userData, lessonsData)

  return (
    <>
      <AppNav
        firstName={userData.userInfo.name}
        username={userData.userInfo.username}
        loggedIn={true}
      />

      <div className="row mt-3">
        <h1 className="col-12">Lessons</h1>
        {lessonsData.lessons.map((lesson: any, i: number) => {
          let l: any = {}
          Object.assign(l, lesson)
          delete l.challenges
          delete l.__typename
          return (
            <div key={i} className="card shadow-sm col-3">
              <div className="card-body pt-5 pb-5">
                <h6 className="card-title font-weight-bold">
                  [ID:{l.id} | ORDER:{l.order}] - {l.title}
                </h6>
                <code>
                  <pre
                    style={{ width: '100%', whiteSpace: 'pre-line' }}
                    className="card-text"
                  >
                    {JSON.stringify(l)}
                  </pre>
                </code>
              </div>
            </div>
          )
        })}
      </div>

      {lessonsData.lessons.map((lesson: any, lidx: number) => {
        return (
          <div key={lidx} className="row mt-3">
            <h1 className="col-12">Lesson {lesson.order} Challenges</h1>
            {lesson.challenges.map((challenge: any, i: number) => {
              return (
                <div key={i} className="card shadow-sm col-3">
                  <div className="card-body pt-5 pb-5">
                    <h6 className="card-title font-weight-bold">
                      [ID:{challenge.id} | ORDER:{challenge.order}] -{' '}
                      {challenge.title}
                    </h6>
                    <code>
                      <pre
                        style={{ width: '100%', whiteSpace: 'pre-line' }}
                        className="card-text"
                      >
                        {JSON.stringify(challenge)}
                      </pre>
                    </code>
                  </div>
                </div>
              )
            })}
          </div>
        )
      })}

      <Footer footerType="py-5 bg-white text-muted" />
    </>
  )
}

export default AdminPage
