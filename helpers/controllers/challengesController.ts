import db from '../dbload'
import { Context } from '../../@types/helpers'
import _ from 'lodash'
import { isAdmin } from '../isAdmin'

const { Challenge, Lesson } = db

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

    const newChallenge = Challenge.build(arg)

    await newChallenge.save()

    return Lesson.findAll({
      include: ['challenges'],
      order: [
        ['order', 'ASC'],
        ['challenges', 'order', 'ASC']
      ]
    })
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
    const { id } = arg

    await Challenge.update(arg, { where: { id } })

    return Lesson.findAll({
      include: ['challenges'],
      order: [
        ['order', 'ASC'],
        ['challenges', 'order', 'ASC']
      ]
    })
  } catch (err) {
    throw new Error(err)
  }
}
