import { User } from '@prisma/client'

/**
 * Generates a string for the provided user that can be embedded in a discord message
 * the string is either the user's id in a format that discord will detect as a mention
 * or the user's c0d3 username formatted to be bold if their discord id cannot be retrieved.
 * @param user - A subset of user type with at least their c0d3 username and discord id.
 */
export const getDiscordMessageUserIdString = (
  user: Pick<User, 'username' | 'discordId'>
): string => {
  return user.discordId ? `<@${user.discordId}>` : `**${user.username}**`
}
