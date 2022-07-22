import React from 'react'
import styles from './announcementCard.module.scss'

type Props = {
  announcements: string[]
}

const AnnouncementCard: React.FC<Props> = ({ announcements }) => {
  return (
    <div
      className={`${styles['announcement-card__container']} card shadow-sm mt-3 p-2 d-flex border-0`}
    >
      <div className="card-body">
        <h1 className={`${styles['announcement-card__title']} fw-bold`}>
          General Announcements
        </h1>
        <div className="mt-3">
          <p className={`${styles['announcement-card__subtitle']} fw-bold`}>
            Updates and Guidelines
          </p>
          {announcements.map((announcement, i) => (
            <p key={i} className="mt-4">
              {announcement}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AnnouncementCard
