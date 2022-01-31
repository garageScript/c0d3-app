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
    user: { isAdmin: true }
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
          authorId: 1,
          content: 'testing',
          name: 'Using functions to make pizza',
          lessonId: 1
        }
      )
    ).toEqual({
      authorId: 1,
      content: 'testing',
      name: 'Using functions to make pizza',
      lessonId: 1
    })
  })
  test('Create modules should have all parameters', async () => {
    expect(
      addModule({}, { authorId: 1, name: 'Hi all', content: 'This module' })
    ).rejects.toThrowError('Missing parameters'),
      expect(
        addModule({}, { authorId: 1, lessonId: 1, content: 'This module' })
      ).rejects.toThrowError('Missing parameters'),
      expect(
        addModule(
          {},
          { content: 'This Module', name: 'Hi all', content: 'This module' }
        )
      ).rejects.toThrowError('Missing parameters'),
      expect(
        addModule({}, { authorId: 1, lessonId: 1, name: 'Hi all' })
      ).rejects.toThrowError('Missing parameters')
  })
})

describe('It should test delete', () => {
  test('It should have an id', async () => {
    expect(deleteModule({}, {})).rejects.toThrowError('Missing parameter')
  })
  test('it should delete module', () => {
    prismaMock.module.delete.mockResolvedValue({ success: true })
    expect(deleteModule({}, { id: 1 })).resolves.toEqual({ success: true })
  })
})
