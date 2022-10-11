import { GetExercisesQuery } from '../graphql'

const getExercisesData: GetExercisesQuery = {
  lessons: [
    {
      title: 'Foundations of JavaScript',
      docUrl: '/curriculum/js0/primitive_data_and_operators',
      slug: 'js0'
    },
    {
      title: 'Variables & Functions',
      docUrl: '/curriculum/js1/hypertext_markup_language',
      slug: 'js1'
    },
    {
      title: 'Arrays',
      docUrl: '/curriculum/js2/introduction_to_testing_inner_properties',
      slug: 'js2'
    },
    {
      title: 'Objects',
      docUrl: '/curriculum/js3/preflight',
      slug: 'js3'
    },
    {
      title: 'Front End Engineering',
      docUrl: '/curriculum/js4/interactive_elements',
      slug: 'js4'
    },
    {
      title: 'End To End',
      docUrl: '/curriculum/js5/request_and_response',
      slug: 'js5'
    },
    {
      title: 'React, GraphQL, SocketIO',
      docUrl: '',
      slug: 'js6'
    },
    {
      title: 'JavaScript Algorithms',
      docUrl:
        'https://docs.google.com/document/d/1ekuu6VbN7qqypm71cVHT-BkdxYSwY0BBHLK8xGXSN1U/edit',
      slug: 'js7'
    },
    {
      title: 'Trees',
      docUrl: '',
      slug: 'js8'
    },
    {
      title: 'General Algorithms',
      docUrl: '',
      slug: 'js9'
    }
  ],
  alerts: [],
  exercises: [
    {
      id: 1,
      module: {
        name: 'Numbers',
        lesson: {
          slug: 'js0'
        }
      },
      author: {
        id: 1,
        username: 'noob',
        email: 'noob@c0d3.com',
        discordUsername: 'noobOnDiscord'
      },
      description: '```\nlet a = 5\na = a + 10\n// what is a?\n```',
      answer: '15',
      explanation: 'You can reassign variables that were created with "let".'
    },
    {
      id: 2,
      module: {
        name: 'Numbers',
        lesson: {
          slug: 'js0'
        }
      },
      author: {
        id: 1,
        username: 'noob',
        email: 'noob@c0d3.com',
        discordUsername: 'noobOnDiscord'
      },
      description: '```\nlet a = 1\na += 2\n// what is a?\n```',
      answer: '3',
      explanation: '`a += 2` is a shorter way to write `a = a + 2`'
    },
    {
      id: 3,
      module: {
        name: 'Numbers',
        lesson: {
          slug: 'js0'
        }
      },
      author: {
        id: 1,
        username: 'noob',
        email: 'noob@c0d3.com',
        discordUsername: 'noobOnDiscord'
      },
      description: '```\nlet a = 1\na -= 2\n// what is a?\n```',
      answer: '-1',
      explanation: null
    }
  ],
  exerciseSubmissions: [{ exerciseId: 1, userAnswer: '15' }]
}

export default getExercisesData
