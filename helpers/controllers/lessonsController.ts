import db from '../dbload'
import { Context } from '../../@types/helpers'
import _ from 'lodash'
import { isAdmin } from '../isAdmin'

const { Lesson } = db

type lessonData = {
  id: number
  order: number
  description: string
  docUrl: string
  githubUrl: string
  videoUrl: string
  title: string
  chatUrl: string
}

export const createLesson = async (
  _parent: void,
  arg: lessonData,
  ctx: Context
) => {
  const { req } = ctx
  try {
    if (!isAdmin(req)) {
      throw new Error('User is not an admin')
    }

    const { title } = arg

    if (!title) {
      throw new Error('Title must not be empty')
    }

    const newLesson = Lesson.build(arg)

    await newLesson.save()

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

export const updateLesson = async (
  _parent: void,
  arg: lessonData,
  ctx: Context
) => {
  const { req } = ctx
  try {
    if (!isAdmin(req)) {
      throw new Error('User is not an admin')
    }

    const { id } = arg

    await Lesson.update(arg, { where: { id } })

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
