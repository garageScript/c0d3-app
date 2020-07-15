import db from '../../helpers/dbload'

const { Lesson } = db

export const lessons = () => {
  return Lesson.findAll({
    include: ['challenges'],
    order: [
      ['order', 'ASC'],
      ['challenges', 'order', 'ASC']
    ]
  })
}
