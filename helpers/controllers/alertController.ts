import db from '../dbload'

const { Alert } = db

type AlertData = {
  text: string
  type: string
  url?: string
  urlCaption?: string
}

export const addAlert = async (_parent: void, arg: AlertData, _ctx: any) => {
  try {
    const { text, type, url, urlCaption } = arg
    console.log(arg)
    await Alert.create({ text, type, url, urlCaption })
    return {
      success: true
    }
  } catch (err) {
    throw new Error(err)
  }
}
