import React from 'react'
import { WithLayout } from '../@types/page'
import { getLayout } from '../components/Layout'
import Title from '../components/Title'
import Card from '../components/Card' 
import NavLink from '../components/NavLink'

const discordConnectPage = 'https://discord.com/api/oauth2/authorize?client_id=845470281283665970&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth%2Fcallback%2Fdiscord&response_type=code&scope=identify%20guilds.join%20gdm.join%20email'

export const ConnectToDiscordPage: React.FC & WithLayout = () => {
    return (
        <>
            <Title title="Login" />
            <Card title="Discord">
                <div className="mt-3">
                    <h3>Connect to Discord</h3>
                    <p>Please connect your Discord account, or create one if you don't already have one. 

Our students and mentors use Discord to communicate and help each other, give you feedback on your challenges, and sometimes do virtual hangouts.

If you don't want to connect to Discord, then you won't get any value out of creating an account on C0D3.com. 
Feel free to browse our lessons and <NavLink path="/curriculum">study on your own!</NavLink>
Also, if you would like to share your reasons for not using Discord, we'd love to hear about it! 
Your thoughts will help us make more informed decisions about our community platform and if the reasons are compelling enough, may inspire us to switch to an alternative.</p>
                </div>
                <a href={discordConnectPage} className="button">Connect to Discord</a>
            </Card>
        </>
    )
}

ConnectToDiscordPage.getLayout = getLayout
