import React, { useEffect, useState } from 'react'
import styles from '../scss/discordBar.module.scss'
type Member = {
  id: string
  username: string
  status: string
  avatar_url: string
}
interface discordJSON {
  members: Member[]
}
interface State extends discordJSON {
  error?: string
}
const TWO_MINUTES = 2 * 60 * 1000
const Member: React.FC<{ avatar: string }> = ({ avatar }) => {
  return (
    <div className="d-inline-block">
      <img src={avatar} className={`${styles['member-avatar']} mx-1`} />
    </div>
  )
}
const DiscordBar: React.FC = () => {
  const [data, setData] = useState<State>({
    members: []
  })
  const getData = async () => {
    try {
      const json = await fetch(
        'https://discord.com/api/guilds/828783458469675019/widget.json'
      ).then(r => r.json())
      if ('members' in json) setData(json as discordJSON)
      else setData({ members: [], error: 'Something went wrong ;(' })
    } catch (e) {
      setData({
        members: [],
        error: `Error fetching data...`
      })
    } finally {
      setTimeout(getData, TWO_MINUTES)
    }
  }
  useEffect(() => {
    getData()
  }, [])
  const reshuffle = (data: discordJSON) => {
    const shuffled = data.members.sort(() => 0.5 - Math.random())
    const remaining = data.members.length - 5
    const profiles = shuffled.slice(0, 5).map(member => {
      return <Member avatar={member.avatar_url} key={member.avatar_url} />
    })
    return (
      <div className="text-center font-weight-bold text-primary">
        {profiles}
        {remaining > 0 && `+${data.members.length - 5}`}
      </div>
    )
  }
  return (
    <div className="bg-white mt-3">
      <div className="container">
        <img src="/assets/discordLogo.svg" />
        <div className="text-primary mt-n3 text-center">
          <span className="font-weight-bold">
            {data.error || data.members.length}
          </span>
          {data.error
            ? ''
            : data.members.length === 1
            ? ' member online'
            : ' members online'}
        </div>
      </div>
      <div className="p-2">
        <div className={`${styles['discord-list']}`}>{reshuffle(data)}</div>
      </div>
      <a
        className={`${styles['discord_link']} font-weight-bold text-white`}
        href="https://discord.com/invite/5KZ99KAs"
        target="_blank"
        rel="noreferrer"
      >
        <div
          className={`border border-primary text-center bg-white text-primary`}
        >
          JOIN
        </div>
      </a>
    </div>
  )
}

export default DiscordBar
