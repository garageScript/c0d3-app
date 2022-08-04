import React from 'react'
import { Linkedin, GitHub, File, Code } from 'react-feather'
import UserInfoImage from '../UserInfoImage'
import styles from './contributorCard.module.scss'

type ContributorCardProps = {
  user: {
    firstName: string
    lastName: string
    username: string
    linkedinUrl: string
    githubPRsUrl: string
    codeSample: string
    resume: string
    discordUserId: string
    discordUsername: string
    discordAvatarUrl: string
  }
}

const ContributorCard: React.FC<ContributorCardProps> = ({ user }) => {
  return (
    <div className="card shadow-sm mb-3">
      <div
        className={`ms-auto me-auto mt-4 ${styles['contributorCard__avatarContainer']}`}
      >
        <UserInfoImage user={user} />
      </div>
      <h2 className="text-center mt-4">
        {`${user.firstName} ${user.lastName}`}
      </h2>
      <h4 className="text-center text-muted mb-4">{'@' + user.username}</h4>
      <div className="card-footer">
        <p>
          <Linkedin className="me-2" />
          <a href={user.linkedinUrl}>LinkedIn</a>
        </p>
        <p>
          <GitHub className="me-2" />
          <a href={user.githubPRsUrl}>Github Contributions</a>
        </p>
        <p>
          <File className="me-2" />
          <a href={user.resume}>Resume</a>
        </p>
        <p>
          <Code className="me-2" />
          <a href={user.codeSample}>Code Sample</a>
        </p>
      </div>
    </div>
  )
}

export default ContributorCard
