import { getDiscordMessageUserIdString } from './getDiscordMessageUserIdString'

describe('getDiscordMessageUserString', () => {
  it("should return the string to mention user's discord id if it is available", () => {
    expect(
      getDiscordMessageUserIdString({
        username: 'user',
        discordId: 'fakeId'
      })
    ).toBe('<@fakeId>')
  })

  it("should return bold c0d3 username if user's discord id is not available", () => {
    expect(
      getDiscordMessageUserIdString({
        username: 'user',
        discordId: null
      })
    ).toBe('**user**')
  })
})
