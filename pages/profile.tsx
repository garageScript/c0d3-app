import React from 'react'
import Card from '../components/Card'
import Layout from '../components/Layout'

const Statistics: React.FC = () => {
  return <Card title="profile"></Card>
}

const Profile: React.FC = () => {
  return (
    <Layout>
      <Statistics />
    </Layout>
  )
}

export default Profile
