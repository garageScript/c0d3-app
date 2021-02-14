import { User, UserLesson } from '../../helpers/dbload'
import { validateLessonId } from '../../helpers/validateLessonId'
import { Op } from 'sequelize'
import { Context } from '../../@types/helpers'
import _ from 'lodash'

type ArgsGetLessonMentors = {
  lessonId: string
}

export const getLessonMentors = async (
  _parent: void,
  args: ArgsGetLessonMentors,
  context: Context
): Promise<User[]> => {
  const { lessonId } = args
  const userId: number | undefined = _.get(context, 'req.user.id', undefined)
  try {
    await validateLessonId(parseInt(lessonId))
    const results: [UserLesson & { user: User }] = await UserLesson.findAll({
      where: {
        lessonId,
        ...(userId && { userId: { [Op.ne]: userId } })
      },
      include: [
        { model: User, as: 'user', attributes: ['username', 'name', 'id'] }
      ]
    })
    return results.map(({ user }) => user)
  } catch (err) {
    throw new Error(err)
  }
}
