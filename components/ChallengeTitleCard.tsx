import React from 'react'

type Props = {
  title: string
  challengeNum: number
  currentState?: string
}

const ChallengeTitleCard: React.FC<Props> = props => {
  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <div>{`${props.challengeNum}. ${props.title}`}</div>
      </div>
    </div>
  )
}

export default ChallengeTitleCard
