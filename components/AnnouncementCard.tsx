import React from 'react'
import styles from '../scss/announcementCard.module.scss'

type Props = {
  announcements: string[]
}

const AnnouncementCard: React.FC<Props> = ({ announcements }) => {
  return (
    <div
      className={`${styles['announcement-card__container']} card shadow-sm mt-3 p-2 border-0`}
    >
      <div className="card-body d-flex flex-column justify-content-around">
        <h1
          className={`${styles['announcement-card__title']} font-weight-bold`}
        >
          General Announcements
        </h1>
        <div className="mt-3 d-flex flex-column justify-content-between">
          <p
            className={`${styles['announcement-card__subtitle']} font-weight-bold`}
          >
            Updates and Guidelines
          </p>
          {announcements.map((announcement, i) => (
            <p key={i} className="mt-3">
              {announcement}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AnnouncementCard
