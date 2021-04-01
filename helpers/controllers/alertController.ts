import { LoggedRequest } from '../../@types/helpers'
import _ from 'lodash'
import { isAdmin } from '../isAdmin'
import { alerts } from '../../graphql/queryResolvers/alerts'
import { prisma } from '../../prisma'
import {
  AddAlertMutationVariables,
  RemoveAlertMutationVariables
} from '../../graphql'

export const addAlert = async (
  _parent: void,
  arg: AddAlertMutationVariables,
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
    // TODO: change createdAt columns to have default value on the DB
    await prisma.alert.create({
      data: { text, type, url, urlCaption, createdAt: new Date() }
    })
    const updatedAlerts = await alerts()
    return updatedAlerts
  } catch (err) {
    req.error(['Invalid data for alert creation', arg])
    throw new Error(err)
  }
}

export const removeAlert = async (
  _parent: void,
  arg: RemoveAlertMutationVariables,
  ctx: { req: LoggedRequest }
) => {
  const { req } = ctx
  try {
    if (!isAdmin(req)) {
      throw new Error('User is not an admin')
    }
    const { id } = arg
    await prisma.alert.delete({ where: { id } })
    return {
      success: true
    }
  } catch (err) {
    req.warn(['Error deleting alert', arg])
    throw new Error(err)
  }
}
