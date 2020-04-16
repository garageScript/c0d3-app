import React from 'react'

type Props = {
  status: string
}

const StatusIcon: React.FC<Props> = ({ status }) => {
  if (status === 'unsubmitted') {
    return <></>
  }
  let statusIconUrl
  switch (status) {
    case 'passed':
      statusIconUrl = '/curriculumAssets/icons/checkmark.svg'
      break
    case 'needMoreWork':
      statusIconUrl = '/curriculumAssets/icons/rejected.svg'
      break
    case 'open':
      statusIconUrl = '/curriculumAssets/icons/pending.svg'
  }
  return (
    <>
      <img width="25px" height="25px" src={statusIconUrl} />
    </>
  )
}

export default StatusIcon
