import { gql } from '@apollo/client'

const GET_LESSONS = gql`
  query getLessons {
    lessons {
      id
      title
      slug
      description
      docUrl
      githubUrl
      videoUrl
      order
      challenges {
        id
        description
        title
        order
      }
      chatUrl
    }
  }
`

export default GET_LESSONS
