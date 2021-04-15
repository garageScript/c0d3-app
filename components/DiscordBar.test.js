import React from 'react'
import DiscordBar from './DiscordBar'
import { render, screen, waitFor } from '@testing-library/react'
describe('DiscordBar component', () => {
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
  const window = global.window
  const createMatcher = (number, string) => {
    return (_, node) => {
      return Array.from(node.children).every(
        child => child.textContent === number || child.textContent === string
      )
    }
  }
  beforeEach(() => {
    global.window = window
    global.Math.random = () => 0.6
  })
  test('Should render no data', async () => {
    global.window.fetch = jest.fn().mockResolvedValue({
      json: async () => ({})
    })

    render(<DiscordBar />)
    const matcher = createMatcher('0', 'members online')
    await waitFor(() => screen.getAllByText(matcher))
  })
  test('Should render one user', async () => {
    global.window.fetch = jest.fn().mockResolvedValue({
      json: async () => ({ presence_count: 0, members: [Bobby] })
    })
    const { container } = render(<DiscordBar />)
    const matcher = createMatcher('1', 'member online')
    await waitFor(() => screen.getAllByText(matcher))
    expect(container).toMatchSnapshot()
  })
  test('Should render two users', async () => {
    global.window.fetch = jest.fn().mockResolvedValue({
      json: async () => ({ presence_count: 2, members: [Bobby, Sly] })
    })
    const { container } = render(<DiscordBar />)
    const matcher = createMatcher('2', 'members online')
    await waitFor(() => screen.getAllByText(matcher))
    expect(container).toMatchSnapshot()
  })
  test('Should render twenty users', async () => {
    global.window.fetch = jest.fn().mockResolvedValue({
      json: async () => ({ presence_count: 20, members: Array(20).fill(Bobby) })
    })
    //disable warnings about 20 children with the same key, production keys are always unique
    jest.spyOn(console, 'error').mockImplementation()
    render(<DiscordBar />)
    const matcher = createMatcher('20', 'members online')
    await waitFor(() => screen.getAllByText(matcher))
  })
  test('Should restart fetching after error', () => {
    global.window.fetch = jest.fn().mockRejectedValue({
      json: () => {}
    })
    render(<DiscordBar />)
  })
})
