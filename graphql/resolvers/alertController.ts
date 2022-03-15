import type { Alert } from '@prisma/client'
import { LoggedRequest } from '../../@types/helpers'
import {
  AddAlertMutationVariables,
  RemoveAlertMutationVariables
} from '../../graphql'
import { alerts } from './alerts'
import prisma from '../../prisma'
import { isAdminOrThrow } from '../../helpers/isAdmin'

export const addAlert = async (
  _parent: void,
  arg: AddAlertMutationVariables,
  ctx: { req: LoggedRequest }
): Promise<Alert[]> => {
  const { req } = ctx
  try {
    isAdminOrThrow(req)
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
    throw err
  }
}

export const removeAlert = async (
  _parent: void,
  arg: RemoveAlertMutationVariables,
  ctx: { req: LoggedRequest }
) => {
  const { req } = ctx
  try {
    isAdminOrThrow(req)
    const { id } = arg
    await prisma.alert.delete({ where: { id } })
    return {
      success: true
    }
  } catch (err) {
    req.warn(['Error deleting alert', arg])
    throw err
  }
}
