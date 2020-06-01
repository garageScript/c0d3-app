export type AlertData = {
  id?: string
  text: string
  type: string
  url?: string
  urlCaption?: string
}

export type DismissedAlerts = {
  [id: string]: boolean
}
