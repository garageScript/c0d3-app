import db from '../dbload'
import { Context } from '../../@types/helpers'
import _ from 'lodash'
import { isAdmin } from '../isAdmin'
import { lessons } from '../../graphql/queryResolvers/lessons'
import { lessonExists } from '../lessonExists'
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

    if (!(await lessonExists(arg.lessonId))) {
      throw new Error('lessonId does not exist in database')
    }

    const newChallenge = Challenge.build(arg)

    await newChallenge.save()

    return lessons()
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

    if (!(await lessonExists(arg.lessonId))) {
      throw new Error('lessonId does not exist in database')
    }

    const { id } = arg

    await Challenge.update(arg, { where: { id } })

    return lessons()
  } catch (err) {
    throw new Error(err)
  }
}
