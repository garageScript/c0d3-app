import type { Alert } from '@prisma/client'
import { LoggedRequest } from '../../@types/helpers'
import {
  AddAlertMutationVariables,
  RemoveAlertMutationVariables
} from '../../graphql'
import { alerts } from '../../graphql/queryResolvers/alerts'
import prisma from '../../prisma'
import { checkIsAdmin } from '../isAdmin'

export const addAlert = async (
  _parent: void,
  arg: AddAlertMutationVariables,
  ctx: { req: LoggedRequest }
): Promise<Alert[]> => {
  const { req } = ctx
  try {
    checkIsAdmin(req)
    const { text, type, url, urlCaption } = arg
    if (!text || !type) {
      throw new Error('Missing alert parameters')
    }
    await prisma.alert.create({
      data: { text, type, url, urlCaption }
    })
    return alerts()
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
    checkIsAdmin(req)
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
