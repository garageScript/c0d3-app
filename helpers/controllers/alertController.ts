import db from '../dbload'
import { LoggedRequest } from '../../@types/helpers'
import _ from 'lodash'
import { isAdmin } from '../isAdmin'
import { alerts } from '../../graphql/queryResolvers/alerts'

const { Alert } = db

type AlertData = {
  text: string
  type: string
  url?: string
  urlCaption?: string
}

export const addAlert = async (
  _parent: void,
  arg: AlertData,
  ctx: { req: LoggedRequest }
) => {
  const { req } = ctx
  try {
    if (!isAdmin(req)) {
      throw new Error('User is not an admin')
    }
    const { text, type, url, urlCaption } = arg
    if (!text || !type) {
      throw new Error('Missing alert parameters')
    }
    await Alert.create({ text, type, url, urlCaption })
    const updatedAlerts = await alerts()
    return updatedAlerts
  } catch (err) {
    req.error(['Invalid data for alert creation', arg])
    throw new Error(err)
  }
}

export const removeAlert = async (
  _parent: void,
  arg: { id: string },
  ctx: { req: LoggedRequest }
) => {
  const { req } = ctx
  try {
    if (!isAdmin(req)) {
      throw new Error('User is not an admin')
    }
    const { id } = arg
    await Alert.destroy({ where: { id } })
    return {
      success: true
    }
  } catch (err) {
    req.warn(['Error deleting alert', arg])
    throw new Error(err)
  }
}
