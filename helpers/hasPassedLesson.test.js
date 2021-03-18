const { UserLesson } = require('./dbload')
const { hasPassedLesson } = require('./hasPassedLesson')

describe('hasPassedLesson helper function', () => {
  test('should return true when user has passed the lesson', async () => {
    UserLesson.findOne = jest.fn().mockReturnValue({
      isPassed: '1596128754889'
    })
    const res = await hasPassedLesson(1, 1)
    expect(res).toBe(true)
  })
  test('should return false when user has not passed the lesson', async () => {
    UserLesson.findOne = jest.fn().mockReturnValue({ isPassed: null })
    const res = await hasPassedLesson(1, 1)
    expect(res).toBe(false)
  })
  test('should return false when userLesson is null', async () => {
    UserLesson.findOne = jest.fn().mockReturnValue(null)
    const res = await hasPassedLesson(1, 1)
    expect(res).toBe(false)
  })
})
