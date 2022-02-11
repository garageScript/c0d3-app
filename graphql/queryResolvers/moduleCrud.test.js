/**
 * @jest-environment node
 */
import prismaMock from '../../__tests__/utils/prismaMock'
import { modules, addModule, deleteModule } from './moduleCrud'

const mockModules = [
  {
    name: 'Quality omlet',
    id: 1
  },
  {
    name: 'Super booster',
    id: 2
  }
]
const ctx = {
  req: {
    user: { isAdmin: true, id: 1 }
  }
}
describe('It should return modules', () => {
  test('Should return modules', () => {
    prismaMock.module.findMany.mockResolvedValue(mockModules)
    expect(modules()).resolves.toEqual(mockModules)
  })
})

describe('It should add a modules', () => {
  test('Should create module', async () => {
    prismaMock.module.create.mockResolvedValue({
      authorId: 1,
      content: 'testing',
      name: 'Using functions to make pizza',
      lessonId: 1
    })
    expect(
      await addModule(
        {},
        {
          content: 'testing',
          name: 'Using functions to make pizza',
          lessonId: 1
        },
        ctx
      )
    ).toEqual({
      authorId: 1,
      content: 'testing',
      name: 'Using functions to make pizza',
      lessonId: 1
    })
  })
})
describe('It should check if user has id', () => {
  test('should throw error if no user.id in context', async () => {
    await expect(
      addModule(
        {},
        {
          id: 2
        },

        {
          req: {
            user: {
              isAdmin: true
            }
          }
        }
      )
    ).rejects.toThrowError('No User')
  })
})

describe('It should test delete', () => {
  test('it should delete module', () => {
    prismaMock.module.delete.mockResolvedValue({ success: true })
    expect(deleteModule({}, { id: 1 }, ctx)).resolves.toEqual({ success: true })
  })
})
