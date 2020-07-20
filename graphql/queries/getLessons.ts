import { gql } from 'apollo-boost'

const GET_LESSONS = gql`
  {
    lessons {
      id
      title
      description
      docUrl
      githubUrl
      videoUrl
      order
      challenges {
        id
        title
        description
        order
      }
      chatUrl
    }
  }
`

export default GET_LESSONS
