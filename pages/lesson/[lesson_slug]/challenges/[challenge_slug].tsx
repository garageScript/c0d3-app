import { initializeApollo } from '../../../../helpers/apolloClient'
import { GetAppQuery, GetAppDocument } from '../../../../graphql'
import { getAllLessonPaths } from '../../../../helpers/static/getAllLessonPaths'
import { getLessonMetaData } from '../../../../helpers/static/getLessonMetaData'
import React from 'react'
import { getLayout } from '../../../../components/LessonLayout'
import { ChallengeQuestionCard } from '../../../../components/ChallengeMaterial'
import ChallengeTitleCard from '../../../../components/ChallengeTitleCard'
import { GetStaticPaths, GetStaticProps } from 'next'
import { Challenge } from '../../../../graphql'
import { WithLayout } from '../../../../@types/page'

type ChallengeMeta = Omit<Challenge, 'lessonId' | 'description' | '__typename'>

type Props = {
  challengeMeta: ChallengeMeta[]
  currentChallenge: Challenge
  lesson_slug: string
}

const ChallengePage: React.FC<Props> & WithLayout = ({
  challengeMeta,
  currentChallenge
}) => {
  return (
    <div className="row challenge-display mt-3">
      <div className={`challenge-display_challenges show col-md-4`}>
        {challengeMeta.map(({ id, order, title }) => (
          <ChallengeTitleCard
            key={order}
            id={id}
            challengeNum={order}
            title={title}
            active={order === currentChallenge.order}
            submissionStatus={'unsubmitted'}
          />
        ))}
      </div>
      <div className="col-md-8">
        <ChallengeQuestionCard
          currentChallenge={{ ...currentChallenge, status: 'TODO' }}
        />
      </div>
    </div>
  )
}

ChallengePage.getLayout = getLayout

export default ChallengePage

type Slugs = {
  lesson_slug: string
  challenge_slug: string
}
export const getStaticPaths: GetStaticPaths<Slugs> = async () => {
  // Generate lesson_slugs from /content/[**folder_name**]
  // Lookup lesson metadata from /content/[lesson_slug]/meta.json
  // Get lesson material from graphql endpoint
  // match lesson_slug meta order with lesson material id - 1;
  // link each lesson slug with each challenge id for that challenge
  // return all {lesson_slug, challenge_slug } combinations

  const lessonSlugs = await getAllLessonPaths().map(
    ({ params: { lesson_slug } }) => lesson_slug
  )

  // TODO: Move challenge material to mdx files and remove graphql
  const apolloClient = initializeApollo()
  const query = await apolloClient.query<GetAppQuery>({
    query: GetAppDocument
  })

  const lessons = query?.data?.lessons
  if (!lessons)
    throw new Error('graphQL Query: GetAppDocument failed to return lessons ')
  const lessonAndChallengePaths = (
    await Promise.all(
      lessonSlugs.map(async lesson_slug => {
        const lessonOrder = (await getLessonMetaData(lesson_slug)).order

        const challengeIds = lessons
          .find(lesson => lesson?.order == lessonOrder)
          ?.challenges?.map(challenge => challenge?.order)
        if (lesson_slug === 'js5') console.log({ challengeIds })
        if (!challengeIds) {
          console.log({ lessons })
          console.log({ lessonOrder })
          console.log({ challengeIds })
          throw new Error(
            `Could not find challengeIds with: "lesson_slug: ${lesson_slug}" & "lessonOrder: ${lessonOrder}"`
          )
        }
        const lessonAndChallengeSlugs = challengeIds?.map(challenge_slug => ({
          params: { lesson_slug, challenge_slug: String(challenge_slug) }
        }))

        return lessonAndChallengeSlugs
      })
    )
  ).flat()

  return {
    paths: lessonAndChallengePaths,
    fallback: false
  }
}

// Todo: Remove any generic in GetStaticProps<any>
export const getStaticProps: GetStaticProps<any, Slugs> = async context => {
  const { lesson_slug, challenge_slug } = context.params ?? {}

  if (!lesson_slug || !challenge_slug)
    throw new Error(
      `getStaticProps is missing a slug.: "lesson_slug: ${lesson_slug}" "challenge_slug: ${challenge_slug}`
    )

  const apolloClient = initializeApollo()
  const query = await apolloClient.query<GetAppQuery>({
    query: GetAppDocument
  })

  const metaData = await getLessonMetaData(lesson_slug)

  const lessons = query.data.lessons
  if (!lessons)
    throw new Error('graphQL Query: GetAppDocument failed to return lessons ')

  const challenges = lessons.find(
    lesson => lesson.id - 1 == metaData.order
  )?.challenges

  if (!challenges)
    throw new Error(
      `Could not find challenges with: "lesson_slug: ${lesson_slug} " &  "challenge_slug: ${challenge_slug}"`
    )

  const currentChallenge = challenges.find(
    challenge => String(challenge.order) === challenge_slug
  )

  if (!currentChallenge)
    throw new Error(
      `Could not find currentChallenge with: "lesson_slug: ${lesson_slug} " &  "challenge_slug: ${challenge_slug}"`
    )

  const challengeMeta = challenges.map(({ order, title, id }) => ({
    order,
    title,
    id
  }))

  return {
    props: {
      lesson_slug,
      challenge_slug,
      currentChallenge,
      challengeMeta,
      metaData
    }
  }
}
