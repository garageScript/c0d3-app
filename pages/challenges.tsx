import * as React from 'react'
import Layout from '../components/Layout'
import LessonTitleCard from '../components/LessonTitleCard'

const setupAlert = (
  <div className="alert bg-primary text-white col-12 mt-4" role="alert">
    <img className="mr-3" src="curriculumAssets/icons/icon-tip.svg" />
    Set up your computer to submit challenges.{' '}
    <a className="text-white" href="#">
      View Instructions
    </a>
  </div>
)

const Challenges: React.FC = () => {
  return (
    <div>
      <Layout>
        <div className="row mt-4">
          <LessonTitleCard
            lessonCoverUrl="js-0-cover.svg"
            lessonUrl="#"
            lessonTitle="Foundations"
          />
          {setupAlert}
        </div>
      </Layout>
    </div>
  )
}

export default Challenges
