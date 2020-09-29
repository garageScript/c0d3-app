import db from '../../helpers/dbload'

const { User, UserLesson } = db

type ArgsGetLessonMentors = {
  lessonId: string
}

export const getLessonMentors = async (
  _parent: void,
  args: ArgsGetLessonMentors
) => {
  const { lessonId } = args
  try {
    let results = await UserLesson.findAll({
      where: { lessonId },
      include: [{ model: User }]
    })

    return results.map((result: any) => {
      return result.User
    })
  } catch (err) {
    console.error('Unable to fetch data: ', err)
    return []
  }
}
