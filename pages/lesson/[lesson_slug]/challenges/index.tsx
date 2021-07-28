import { initializeApollo } from '../../../../helpers/apolloClient'
import { GetAppQuery, GetAppDocument, Challenge } from '../../../../graphql'

import React from 'react'
import { getLayout } from '../../../../components/LessonLayout'
import { getAllLessonPaths } from '../../../../helpers/static/getAllLessonPaths'
import { getLessonMetaData } from '../../../../helpers/static/getLessonMetaData'
import ChallengeTitleCard from '../../../../components/ChallengeTitleCard'
import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { WithLayout } from '../../../../@types/page'

type ChallengeMeta = Omit<Challenge, '__typename' | 'description' | 'lessonId'>
type Props = {
  lesson_slug: string
  challengesMeta: ChallengeMeta[]
}
const ChallengesIndex: React.FC<Props> & WithLayout = ({ challengesMeta }) => {
  return (
    <div className="row challenge-display mt-3">
      <div className={`challenge-display_challenges show col-md-4`}>
        {challengesMeta.map(({ id, order, title }) => (
          <ChallengeTitleCard
            key={order}
            id={id}
            challengeNum={order}
            title={title}
            active={false}
            submissionStatus={'unsubmitted'}
          />
        ))}
      </div>
    </div>
  )
}
ChallengesIndex.getLayout = getLayout

export default ChallengesIndex

interface Slugs extends ParsedUrlQuery {
  lesson_slug: string
}

export const getStaticPaths: GetStaticPaths<Slugs> = () => {
  const paths = getAllLessonPaths()
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps<any, Slugs> = async context => {
  const lesson_slug = context?.params?.lesson_slug

  if (!lesson_slug)
    throw new Error('getStaticProps did not receive {params: {lesson_slug}}')

  // TODO: move all challenge info to static mdx files
  const apolloClient = initializeApollo()
  const query = await apolloClient.query<GetAppQuery>({
    query: GetAppDocument
  })

  const metaData = await getLessonMetaData(lesson_slug)

  const challenges = query.data.lessons.find(
    lesson => lesson.id - 1 == metaData.order
  )?.challenges

  if (!challenges)
    throw new Error(
      `Failed to find challenges for "lesson_slug: ${lesson_slug}"`
    )

  const challengesMeta = challenges.map(({ id, order, title }) => ({
    id,
    order,
    title
  }))
  return {
    props: {
      challengesMeta,
      lesson_slug,
      metaData //Consumed by LessonLayout
    }
  }
}
