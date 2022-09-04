import React, { useState } from 'react'
import UserInfoImage from './UserInfoImage'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../scss/profileImageInfo.module.scss'
import { UserInfo } from '../@types/user'
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle
} from 'react-bootstrap'
import { Button } from './theme/Button'
import { signIn } from 'next-auth/react'
import { Button as BsButton } from 'react-bootstrap'
import { useMutation } from '@apollo/client'
import { UNLINK_DISCORD } from '../graphql/queries/unlinkDiscord'
import { useRouter } from 'next/router'

type ProfileImageInfoProps = {
  user: UserInfo
}

const ProfileImageInfo: React.FC<ProfileImageInfoProps> = ({ user }) => {
  const [unlinkDiscord] = useMutation(UNLINK_DISCORD)
  const router = useRouter()

  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const handleConnectClick = () => {
    signIn('discord', { callbackUrl: '/discord/success' })
    handleShow()
  }

  const handleUnlinkClick = async () => {
    try {
      handleClose()
      await unlinkDiscord()
      router.reload()
    } catch (e) {
      // Calling this function make DiscordBar in storyshots fail with:
      // Warning: An update to DiscordBar inside a test was not wrapped in act(...)
      // Track it on https://github.com/garageScript/c0d3-app/issues/2257
      // Sentry.captureException(e)
    }
  }

  return (
    <div className="card shadow-sm">
      <div
        className={`ms-auto me-auto mt-4 mb-3 ${styles['profile_image_container']}`}
      >
        <UserInfoImage user={user} className="mt-4" />
      </div>
      <h4 className="text-center mt-4">
        {`${user.firstName} ${user.lastName}`}
      </h4>
      <div className="d-flex justify-content-center">
        <h5 className="text-muted">{`@${user.username}`}</h5>
      </div>
      <div className="d-flex ms-auto me-auto mb-4 mt-3 flex-column">
        {user.discordUserId ? (
          <>
            <div className="d-flex align-items-center mb-2">
              <Image
                src="/assets/discordClydeLogo.svg"
                height={20}
                width={20}
                objectFit="contain"
              />
              <h5 className="ms-2 mb-0">
                <Link
                  href={`https://discordapp.com/users/${user.discordUserId}/`}
                >
                  {user.discordUsername}
                </Link>
              </h5>
            </div>
            <Button onClick={handleShow} type="danger" outline color="danger">
              Unlink discord
            </Button>
            <Modal show={show} onHide={handleClose}>
              <ModalHeader closeButton>
                <ModalTitle>Unlink discord</ModalTitle>
              </ModalHeader>
              <ModalBody>
                <p>
                  You are about to unlink your discord account. Please be aware
                  that disconnecting your discord account will degrade your
                  learning experience in c0d3 as we use discord as our community
                  platform
                </p>
              </ModalBody>
              <ModalFooter>
                <BsButton variant="secondary" onClick={handleClose}>
                  Close
                </BsButton>
                <BsButton
                  variant="danger"
                  onClick={handleUnlinkClick}
                  data-testid="unlink-discord-btn"
                >
                  Unlink
                </BsButton>
              </ModalFooter>
            </Modal>
          </>
        ) : (
          <>
            <button
              type="button"
              className="btn btn-primary btn-md btn-block mt-3"
              onClick={handleConnectClick}
            >
              Connect to discord
            </button>
            <Modal show={show} onHide={handleClose}>
              <ModalHeader closeButton>
                <ModalTitle>Connect to discord</ModalTitle>
              </ModalHeader>
              <ModalBody>
                <p>
                  Please connect your Discord account, or create one if you
                  don&apos;t already have one. Our students and mentors use
                  Discord to communicate and help each other, give you feedback
                  on your challenges, and sometimes do virtual hangouts.
                </p>
                <p>
                  If you don&apos;t want to connect to Discord, then you
                  won&apos;t get any value out of creating an account on
                  C0D3.com. Feel free to browse our lessons and study on your
                  own!
                </p>
                <p>
                  Also, if you would like to share your reasons for not using
                  Discord, we&apos;d love to hear about it! Your thoughts will
                  help us make more informed decisions about our community
                  platform and if the reasons are compelling enough, may inspire
                  us to switch to an alternative.
                </p>
              </ModalBody>
              <ModalFooter>
                <BsButton variant="secondary" onClick={handleClose}>
                  Close
                </BsButton>
                <BsButton
                  variant="primary"
                  onClick={handleClose}
                  data-testid="connect-discord-btn"
                >
                  Connect
                </BsButton>
              </ModalFooter>
            </Modal>
          </>
        )}
      </div>
    </div>
  )
}

export default ProfileImageInfo
