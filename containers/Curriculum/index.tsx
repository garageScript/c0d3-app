// import libraries
import React from 'react'
import { useQuery } from '@apollo/react-hooks'

// import components
import Layout from '../../components/Layout'
import ProgressCard from '../../components/ProgressCard'
import AnnouncementCard from '../../components/AnnouncementCard'
import AdditionalResources from '../../components/AdditionalResources'

// import curriculum components
import Lessons from './Lessons'

// import graphql queries
import { GET_LESSONS } from '../../graphql/queries'

const Curriculum: React.FC = () => {
  const { loading, data } = useQuery(GET_LESSONS)
  if (loading) {
    return <h1>Loading</h1>
  }
  const announcements = [
    'To make space for other students on our servers, your account will be deleted after 30 days of inactivity.',
    'Take each lesson challenge seriously and do them over and over again until you can solve them. With the exception End to End, all challenges are questions and exercises taken from real interviews.',
    'This lesson will not only prepare you for interviews, but it will also help teach you the skills that you need to become an effective engineer.',
    'After completing Foundations of JavaScript, Variables & Functions, Array, Objects, End to End, HTML/CSS/JavaScript, React/GraphQL/SocketIO, you will be technically ready to contribute to our codebase.'
  ]
  return (
    <Layout>
      <div className="row mt-4">
        <div className="col-8">
          <Lessons lessonData={data} />
        </div>
        <div className="col-4">
          <ProgressCard progressCount={0} />
          <AnnouncementCard announcements={announcements} />
          <AdditionalResources />
        </div>
      </div>
    </Layout>
  )
}

export default Curriculum
