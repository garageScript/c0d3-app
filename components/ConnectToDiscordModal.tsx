import React, { useEffect, useState } from 'react'
import { ModalCard, ModalSize } from './ModalCard'
import styles from '../scss/connectToDiscordModal.module.scss'
import { signIn } from 'next-auth/react'
type ConnectToDiscordModalProps = {
  show: boolean
  close: () => void
}

const discordConnectPage = `${process.env.NEXT_PUBLIC_DISCORD_CALLBACK_URI}`

const CONNECT_TO_DISCORD_LOCALSTORAGE_KEY = 'connect-to-discord'
const SEVEN_DAYS = 1000 * 60 * 60 * 24 * 7

const ConnectToDiscordModal: React.FC<ConnectToDiscordModalProps> = ({
  show,
  close
}) => {
  const [dismissalDate, setDismissalDate] = useState(0)
  useEffect(() => {
    const prevDismissalDate = localStorage.getItem(
      CONNECT_TO_DISCORD_LOCALSTORAGE_KEY
    )
    if (!prevDismissalDate) {
      return
    }
    setDismissalDate(Number(prevDismissalDate))
  }, [])
  const showAgain = Date.now() - SEVEN_DAYS > dismissalDate
  /*
    show = false // means connected to Discord

    show | showAgain            | Final
    0    |  0  (doesn't matter) |  0
    0    |  1  (doesn't matter) |  0
    1    |  0                   |  0
    1    |  1                   |  1
  */
  return (
    <ModalCard
      hideable={false}
      size={ModalSize.LARGE}
      close={close}
      show={show && showAgain}
    >
      <div className="m-5">
        <h3 className="text-center">Connect to Discord</h3>
        <div className="mt-3">
          <p>
            Please{' '}
            <a
              href={discordConnectPage}
              className={`${styles['link']} link-primary button`}
            >
              connect your Discord account
            </a>
            , or create one if you don&apos;t already have one. Our students and
            mentors use Discord to communicate and help each other, give you
            feedback on your challenges, and sometimes do virtual hangouts.
          </p>
          <p>
            If you don&apos;t want to connect to Discord, then you won&apos;t
            get any value out of creating an account on C0D3.com. Feel free to
            browse our lessons and study on your own!
          </p>
          <p>
            Also, if you would like to share your reasons for not using Discord,
            we&apos;d love to hear about it! Your thoughts will help us make
            more informed decisions about our community platform and if the
            reasons are compelling enough, may inspire us to switch to an
            alternative.
          </p>
        </div>
        <div className="d-grid">
          <button
            type="button"
            className="btn btn-primary btn-lg btn-block mb-3"
            onClick={() =>
              signIn('discord', { callbackUrl: '/discord/success' })
            }
          >
            Connect Now
          </button>
        </div>
        <div
          className="text-center"
          onClick={() => {
            localStorage.setItem(
              CONNECT_TO_DISCORD_LOCALSTORAGE_KEY,
              String(Date.now())
            )
            close()
          }}
        >
          <a href="#" className={`${styles['link']} link-primary`}>
            No thanks, I&apos;ll study on my own.
          </a>
        </div>
      </div>
    </ModalCard>
  )
}

export default ConnectToDiscordModal
