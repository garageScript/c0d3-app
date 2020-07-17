import db from '../dbload'
import { Context } from '../../@types/helpers'
import _ from 'lodash'
import { isAdmin } from '../isAdmin'

const { Challenge } = db

type challengeData = {
  lessonId: number
  id: number
  order?: number
  description?: string
  title?: string
}

export const createChallenge = async (
  _parent: void,
  arg: challengeData,
  ctx: Context
) => {
  const { req } = ctx
  try {
    if (!isAdmin(req)) {
      throw new Error('User is not an admin')
    }

    const { description, title, id, order, lessonId } = arg

    const newChallenge = Challenge.build({
      id,
      description,
      title,
      order,
      lessonId
    })

    await newChallenge.save()

    return {
      success: true
    }
  } catch (err) {
    throw new Error(err)
  }
}

export const updateChallenge = async (
  _parent: void,
  arg: challengeData,
  ctx: Context
) => {
  const { req } = ctx
  try {
    if (!isAdmin(req)) {
      throw new Error('User is not an admin')
    }

    const { description, title, id, lessonId, order } = arg

    await Challenge.update(
      {
        description,
        lessonId,
        order,
        title,
        id
      },
      {
        where: {
          id: id
        }
      }
    )

    return {
      success: true
    }
  } catch (err) {
    throw new Error(err)
  }
}
