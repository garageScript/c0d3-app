import React from 'react'

import '../scss/announcementCard.scss'

type Props = {
  announcementOne: string
  announcementTwo: string
  announcementThree: string
  announcementFour: string
}

const AnnouncementCard: React.FC<Props> = ({
  announcementOne,
  announcementTwo,
  announcementThree,
  announcementFour
}) => {
  return (
    <div className="announcement-card__container card shadow-sm mt-3 p-2 d-flex border-0">
      <div className="card-body">
        <h1 className="announcement-card__title">General Announcements</h1>
        <div className="mt-3">
          <p className="font-weight-bold">Updates and Guidelines</p>
          <p className="mt-4">{announcementOne}</p>
          <p className="mt-4">{announcementTwo}</p>
          <p className="mt-4">{announcementThree}</p>
          <p className="mt-4">{announcementFour}</p>
        </div>
      </div>
    </div>
  )
}

export default AnnouncementCard
