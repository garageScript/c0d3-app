import React from 'react'
import jest from 'jest-mock'
import DiscordBar from '../../components/DiscordBar'
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
export const Error: React.FC = () => {
  global.fetch = (jest.fn() as any).mockRejectedValue({
    json: async () => ({ presence_count: 0 })
  })
  return (
    <Wrapper>
      <DiscordBar />
    </Wrapper>
  )
}
export const Empty: React.FC = () => {
  global.fetch = (jest.fn() as any).mockResolvedValue({
    json: async () => ({ presence_count: 0 })
  })
  return (
    <Wrapper>
      <DiscordBar />
    </Wrapper>
  )
}
export const TwoUsers: React.FC = () => {
  global.fetch = (jest.fn() as any).mockResolvedValue({
    json: async () => ({ presence_count: 2, members: [Bobby, Sly] })
  })
  return (
    <Wrapper>
      <DiscordBar />
    </Wrapper>
  )
}
export const SixUsers: React.FC = () => {
  global.fetch = (jest.fn() as any).mockResolvedValue({
    json: async () => ({
      presence_count: 6,
      members: [Sly, Sly, Bobby, Sly, Sly, Bobby]
    })
  })
  return (
    <Wrapper>
      <DiscordBar />
    </Wrapper>
  )
}
export const TwentyUsers: React.FC = () => {
  global.fetch = (jest.fn() as any).mockResolvedValue({
    json: async () => ({ presence_count: 20, members: Array(20).fill(Bobby) })
  })
  return (
    <Wrapper>
      <DiscordBar />
    </Wrapper>
  )
}
