import React, { useEffect, useState } from 'react'
import styles from '../scss/discordBar.module.scss'
type Member = {
  id: string
  username: string
  status: string
  avatar_url: string
}
interface discordJSON {
  presence_count: number
  members: Member[]
}
const ONE_MINUTE = 60 * 1000
const Member: React.FC<{ avatar: string }> = ({ avatar }) => {
  return (
    <div className="d-inline-block">
      <img src={avatar} className={`${styles['member-avatar']} mx-1`} />
    </div>
  )
}
const DiscordBar: React.FC = () => {
  const [data, setData] = useState<discordJSON>({
    presence_count: 1,
    members: []
  })
  const getData = async () => {
    try {
      let data = await fetch(
        'https://discord.com/api/guilds/828783458469675019/widget.json'
      )
      data = await data.json()
      setData((data as unknown) as discordJSON)
      setTimeout(getData, ONE_MINUTE)
    } catch (e) {
      setTimeout(getData, ONE_MINUTE)
    }
  }
  useEffect(() => {
    getData()
  }, [])
  const reshuffle = (data: discordJSON) => {
    if (data.members) {
      const shuffled = data.members.sort(() => 0.5 - Math.random())
      const remaining = data.members.length - 6
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
  }
  return (
    <div className="bg-white mt-3">
      <div className="container">
        <img src="/assets/discordLogo.svg" />
        <div className="text-primary mt-n3 text-center">
          <span className="font-weight-bold">
            {data.members ? data.members.length : '0'}
          </span>
          {data.members && data.members.length === 1
            ? ' member online'
            : ' members online'}
        </div>
      </div>
      <div className="p-2">
        <div className={`${styles['discord-list']}`}>{reshuffle(data)}</div>
      </div>
      <div className={`${styles['discord-join']} bg-primary text-center`}>
        <a
          className="font-weight-bold text-white"
          href="https://discord.com/invite/5KZ99KAs"
          target="_blank"
          rel="noreferrer"
        >
          JOIN
        </a>
      </div>
    </div>
  )
}

export default DiscordBar
