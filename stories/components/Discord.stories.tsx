import React from 'react'
import jest from 'jest-mock'
import DiscordBar from '../../components/DiscordBar'
import fetchMock from 'fetch-mock'

const Wrapper: React.FC = ({ children }) => {
  return <div style={{ maxWidth: '350px' }}>{children}</div>
}

declare let global: { fetch: {} }

const Bobby = {
  avatar_url:
    'https://cdn.discordapp.com/widget-avatars/Niju_ahWJDG-ehJlK3DLrBV2kceVq5gNEEb3pnDqO7Y/dpYnY4uiLVWlkMqjQCsG8vRqu9DUjZu_Burf1MHBQ2DxS0GUfACw7Or1oCLR061S9v906uMu3Wfl_e3HHizB1NfjbZfxiqHmAj2Ob7hM_xXARZvl2mgC7xq1y3jYKlgQQBGMVeQ_KutHDw',
  name: 'Bobby'
}

const Sly = {
  avatar_url:
    'https://cdn.discordapp.com/widget-avatars/JbWqF_-A-fVbRlrdu1vtB6JU1cQp8bNJIeoDfKt_5NM/suFvloPCkCf8iut738QMC2F6Pqvm02gd0m_fq7hHXtw15bmIDqmYQ-3xRhmScXEcjFGoJVB2Q-FZf37ClwvMP3t3JPfxELAdCpzSjq9GHM8X7bzaDuamjMZiOsHE6OuD7wlZf-i4FlrbBg',
  name: 'Sly'
}

export default {
  component: DiscordBar,
  title: 'Components/Discord'
}

export const ErrorFetching: React.FC = () => {
  fetchMock.restore().mock('*', 404)
  return (
    <Wrapper>
      <DiscordBar />
    </Wrapper>
  )
}

export const EmptyMembers: React.FC = () => {
  fetchMock.restore().mock('*', { presence_count: 0, status: 200, members: [] })
  return (
    <Wrapper>
      <DiscordBar />
    </Wrapper>
  )
}

export const OneUser: React.FC = () => {
  fetchMock
    .restore()
    .mock('*', { presence_count: 1, status: 200, members: [Sly] })
  return (
    <Wrapper>
      <DiscordBar />
    </Wrapper>
  )
}

export const TwoUsers: React.FC = () => {
  fetchMock
    .restore()
    .mock('*', { presence_count: 2, status: 200, members: [Bobby, Sly] })
  return (
    <Wrapper>
      <DiscordBar />
    </Wrapper>
  )
}

export const SixUsers: React.FC = () => {
  fetchMock.restore().mock('*', {
    presence_count: 6,
    status: 200,
    members: [Sly, Sly, Bobby, Sly, Sly, Bobby]
  })

  return (
    <Wrapper>
      <DiscordBar />
    </Wrapper>
  )
}

export const TwentyUsers: React.FC = () => {
  fetchMock.restore().mock('*', {
    presence_count: 29,
    status: 200,
    members: Array(20).fill(Bobby)
  })
  return (
    <Wrapper>
      <DiscordBar />
    </Wrapper>
  )
}
