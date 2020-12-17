export interface ChannelInfo {
  status: number
  statusText: string
  json: () => Promise<{ id: string }>
}

export interface UserInfo {
  id: string
  username: string
  email: string
}

export type GetChannelInfo = (roomName: string) => Promise<{ id: string }>

export type PublicChannelMessage = (
  channelName: string,
  message: string
) => void

export type SendMessage = (channelId: string, message: string) => void

export type SendDirectMessage = (userId: string, message: string) => void

export type DirectChannelInfo = (
  senderId: string,
  receiverId: string
) => Promise<{ id: string }>
