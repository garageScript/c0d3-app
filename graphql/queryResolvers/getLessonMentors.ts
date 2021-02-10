import { User, UserLesson } from '../../helpers/dbload'
import { validateLessonId } from '../../helpers/validateLessonId'

type ArgsGetLessonMentors = {
  lessonId: string
}

export const getLessonMentors = async (
  _parent: void,
  args: ArgsGetLessonMentors
): Promise<User[]> => {
  const { lessonId } = args
  try {
    await validateLessonId(parseInt(lessonId))
    const results: [UserLesson & { user: User }] = await UserLesson.findAll({
      where: {
        lessonId
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
