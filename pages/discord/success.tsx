import React from 'react'
import { WithLayout } from '../../@types/page'
import { getLayout } from '../../components/Layout'
import Title from '../../components/Title'
import Card from '../../components/Card'
import Link from 'next/link'

const ConnectToDiscordSuccess: React.FC & WithLayout = () => {
  return (
    <>
      <Title title="Success!" />
      <Card title="Success!">
        <div className="mt-3">
          <p>You are now connected to Discord!</p>
        </div>
        <Link href="/curriculum" passHref>
          <button
            type="button"
            className="btn btn-primary btn-lg btn-block mb-3"
          >
            Continue to Curriculum
          </button>
        </Link>
      </Card>
    </>
  )
}

ConnectToDiscordSuccess.getLayout = getLayout

export default ConnectToDiscordSuccess
