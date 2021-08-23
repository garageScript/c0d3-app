import React, { useState, useEffect } from 'react'
import { WithLayout } from '../@types/page'
import { getLayout } from '../components/Layout'
import Title from '../components/Title'
import Card from '../components/Card' 

export const ConnectToDiscordPage: React.FC & WithLayout = () => {
    return (
        <>
            <Title title="Login" />
            <Card title="Discord">
                <div className="mt-3">
                    <h3>Connect to Discord</h3>
                </div>
            </Card>
        </>
    )
}

ConnectToDiscordPage.getLayout = getLayout
