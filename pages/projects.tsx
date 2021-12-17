import { GetStaticProps } from 'next'
import React from 'react'
import Error, { StatusCode } from '../components/Error'
import Layout from '../components/Layout'
import ProjectCard from '../components/ProjectCard'
import { GetProjectsQuery, GetProjectsDocument } from '../graphql/'
import { initializeApollo } from '../helpers/apolloClient'
import styles from '../scss/curriculum.module.scss'

type Props = {
  projects: {
    title: string
    description: string
    members: object[]
  }[]
}

export const Projects: React.FC<Props> = ({ projects }) => {
  if (!projects) {
    return <Error code={StatusCode.INTERNAL_SERVER_ERROR} message="Bad data" />
  }

  const projectsToRender: React.ReactElement[] = projects.map(
    (project, idx) => {
      const { title, description, members } = project

      return (
        <ProjectCard
          key={idx}
          title={title}
          description={description}
          members={members}
        />
      )
    }
  )

  return (
    <Layout title="Projects">
      <div
        className={`row overflow-auto flex-nowrap ${styles['parent-scroll']}`}
        data-testid="parent-scroll"
      >
        <div className={`col-12 ${styles['child-scroll']}`}>
          {projectsToRender}
        </div>
      </div>
    </Layout>
  )
}

const FIVE_MINUTES = 5 * 60

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo()
  const query = await apolloClient.query<GetProjectsQuery>({
    query: GetProjectsDocument
  })

  return {
    props: {
      projects: query.data.projects
    },
    revalidate: FIVE_MINUTES
  }
}

export default Projects
