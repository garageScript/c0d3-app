import React from 'react'

type Props = {
  announcements: string[]
}

const AnnouncementCard: React.FC<Props> = ({ announcements }) => {
  const announcementElements: React.ReactElement[] = announcements.map(
    (text, i) => (
      <p key={i} className="mt-4">
        {text}
      </p>
    )
  )

  return (
    <div className="announcement-card__container card shadow-sm mt-3 p-2 d-flex border-0">
      <div className="card-body">
        <h1 className="announcement-card__title">General Announcements</h1>
        <div className="mt-3">
          <p className="font-weight-bold">Updates and Guidelines</p>
          {announcementElements}
        </div>
      </div>
    </div>
  )
}

export default AnnouncementCard
