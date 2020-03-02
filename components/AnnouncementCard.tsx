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
    <div className="announcement-card__container card shadow-sm mt-3">
      <div className="card-body">
        <h4>General Announcements</h4>
        <div className="announcement-card__paragraph-container">
          <h6 className="announcement-card__subheading font-weight-bold mt-4">
            Updates and Guidelines
          </h6>
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
