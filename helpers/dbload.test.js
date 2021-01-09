jest.mock('sequelize')
process.env.NODE_ENV = 'development'
import lessonData from '../__dummy__/lessonData'

describe('dbload test', () => {
  beforeEach(() => {
    jest.resetModules()
  })
  it('should not add data if tables are not empty', async () => {
    const { Lesson } = require('./models/Lesson')
    const { Challenge } = require('./models/Challenge')
    Lesson.findAll.mockResolvedValueOnce(['with data'])
    Challenge.findAll.mockResolvedValue(['with data'])
    await require('./dbload')
    expect(Lesson.findAll).toHaveBeenCalled()
    expect(Challenge.findAll).toHaveBeenCalled()
    expect(Lesson.bulkCreate).toHaveBeenCalledTimes(0)
    expect(Challenge.bulkCreate).toHaveBeenCalledTimes(0)
  })
  it('it should add data if challenge and lesson tables are empty', async () => {
    const { Lesson } = require('./models/Lesson')
    const { Challenge } = require('./models/Challenge')
    Lesson.findAll.mockResolvedValueOnce([])
    Challenge.findAll.mockResolvedValue([])
    await require('./dbload')
    expect(Lesson.findAll).toHaveBeenCalled()
    expect(Lesson.bulkCreate).toHaveBeenCalledWith(lessonData)
    expect(Challenge.findAll).toHaveBeenCalled()
    expect(Challenge.bulkCreate).toHaveBeenCalledTimes(lessonData.length + 1)
  })
})
