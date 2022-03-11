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

describe('It should add modules', () => {
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
  test('it should check user id when adding', async () => {
    await expect(
      addModule(
        {},
        {
          content: 'testing',
          name: 'Using functions to make pie',
          lessonId: 1
        },
        {
          req: { user: { isAdmin: true } }
        }
      )
    ).rejects.toThrow(new Error('No User'))
  })
  test('it should check if user is an admin', async () => {
    await expect(
      addModule(
        {},
        {
          content: 'testing',
          name: 'Using functions to make pie',
          lessonId: 1
        },
        {
          req: { user: { isAdmin: false, id: 1 } }
        }
      )
    ).rejects.toThrow(new Error('User is not an admin'))
  })
})

describe('It should test delete', () => {
  test('it should delete module', () => {
    prismaMock.module.delete.mockResolvedValue({ success: true })
    expect(deleteModule({}, { id: 1 }, ctx)).resolves.toEqual({ success: true })
  })
  test('it should check if user is an admin', async () => {
    await expect(
      deleteModule(
        {},
        {
          content: 'testing',
          name: 'Using functions to make pie',
          lessonId: 1
        },
        {
          req: { user: { isAdmin: false, id: 1 } }
        }
      )
    ).rejects.toThrow(new Error('User is not an admin'))
  })
  test('should check id when deleting', async () => {
    await expect(
      deleteModule(
        {},
        {
          lessonId: 1
        },
        {
          req: { user: { isAdmin: true } }
        }
      )
    ).rejects.toThrow(new Error('No User'))
  })
})
