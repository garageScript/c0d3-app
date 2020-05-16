export interface ChannelInfo {
  status: number
  statusText: string
  json: () => Promise<{ id: string }>
}

export type GetChannelInfo = (roomName: string) => Promise<{ id: string }>

export type PublicChannelMessage = (
  channelName: string,
  message: string
) => void

export type SendMessage = (channelId: string, message: string) => void
