import React from 'react'
import Link from 'next/link'
import { SubmissionStatus } from '../graphql'
import { useRouter } from 'next/router'
type StatusIconProps = {
  status: string
}
const StatusIcon: React.FC<StatusIconProps> = ({ status }) => {
  if (status === 'unsubmitted') {
    return null
  }
  let statusIconUrl
  switch (status) {
    case SubmissionStatus.Passed:
      statusIconUrl = '/assets/curriculum/icons/checkmark.svg'
      break
    case SubmissionStatus.NeedMoreWork:
      statusIconUrl = '/assets/curriculum/icons/rejected.svg'
      break
    case SubmissionStatus.Open:
      statusIconUrl = '/assets/curriculum/icons/pending.svg'
  }
  return <img width="25px" height="25px" src={statusIconUrl} />
}

type ChallengeTitleCardProps = {
  key: number
  id: number
  title: string
  challengeNum: number
  submissionStatus: string
  active?: boolean
}

const ChallengeTitleCard: React.FC<ChallengeTitleCardProps> = ({
  submissionStatus,
  active,
  title,
  challengeNum
}) => {
  const router = useRouter()
  const { lesson_slug } = router.query
  const cardStyles: string[] = ['challenge-title-card']
  if (active) {
    cardStyles.push('challenge-title-card--active')
  }
  if (submissionStatus === SubmissionStatus.Passed) {
    cardStyles.push('challenge-title-card--done')
  } else {
    cardStyles.push('shadow-sm', 'border-0')
  }

  return (
    <div
      data-testid="challenge-title"
      className={`card mb-2 ${cardStyles.join(' ')}`}
    >
      <div className="card-body d-flex justify-content-between">
        <Link
          as={`/lesson/${lesson_slug}/challenges/${challengeNum}`}
          href={`/lesson/[lesson_slug]/challenges/[challenge_slug]`}
        >
          <a>{`${challengeNum}. ${title}`}</a>
        </Link>

        <StatusIcon status={submissionStatus} />
      </div>
    </div>
  )
}

export default ChallengeTitleCard
