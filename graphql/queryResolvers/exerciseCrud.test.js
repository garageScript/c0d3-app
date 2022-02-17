/**
 * @jest-environment node
 */
import prismaMock from '../../__tests__/utils/prismaMock'
import {
  exercises,
  deleteExercise,
  addExercise,
  updateExercise
} from './exerciseCrud'
const unsigned = {
  req: {
    user: {}
  }
}
const AdminCtx = {
  req: {
    user: { isAdmin: true, id: 1 }
  }
}
const mockExercises = [
  {
    id: 1,
    description: 'const a = 3 what is a',
    answer: 3
  },
  {
    id: 2,
    description: 'What is love',
    answer: 'No'
  }
]

describe('It should return all exercises', () => {
  test('Should return exercises', () => {
    prismaMock.exercise.findMany.mockResolvedValue(mockExercises)
    expect(exercises()).resolves.toEqual(mockExercises)
  })
})

describe('It should add exercises', () => {
  test('It should make an exercise', async () => {
    prismaMock.exercise.create.mockResolvedValue({
      id: 1,
      authorId: 1,
      description: "What's 2",
      answer: 'Number',
      testable: false
    })
    expect(
      await addExercise(
        {},
        { description: "What's 2", answer: 'Number' },
        AdminCtx
      )
    ).toEqual({
      id: 1,
      authorId: 1,
      description: "What's 2",
      answer: 'Number',
      testable: false
    })
  })
  test('it should check user id ', () => {
    expect(
      addExercise(
        {},
        {
          content: 'testing',
          name: 'Using functions to make pie',
          lessonId: 1,
          testable: false
        },
        {
          req: {}
        }
      )
    ).rejects.toThrowError()
  })
  test('it should check if testStr is present with testable ', () => {
    expect(
      addExercise(
        {},
        {
          content: 'testing',
          name: 'Using functions to make pie',
          lessonId: 1,
          testable: true
        },
        {
          req: { user: { id: 3 } }
        }
      )
    ).rejects.toThrow(new Error('Testable must have test string'))
  })
})

describe('It should update an exercise', () => {
  test('should update a users name ', async () => {
    const exer = {
      id: 1,
      description: 'Whats 2',
      answer: 2
    }

    prismaMock.exercise.update.mockResolvedValue(exer)

    await expect(updateExercise({}, exer, AdminCtx)).resolves.toEqual({
      id: 1,
      description: 'Whats 2',
      answer: 2
    })
  })
  test('It should check if user is signed in', () => {
    expect(
      updateExercise(
        {},
        {
          content: 'testing',
          name: 'Using functions to make pie',
          lessonId: 1,
          testable: false
        },
        {
          req: {}
        }
      )
    ).rejects.toThrowError()
  })
  test('It should check if user is signed in', () => {
    expect(
      updateExercise(
        {},
        {
          content: 'testing',
          name: 'Using functions to make pie',
          lessonId: 1,
          testable: false
        },
        {
          req: {}
        }
      )
    ).rejects.toThrowError()
  })
  test('It should check if user is signed in', () => {
    expect(
      updateExercise(
        {},
        {
          content: 'testing',
          name: 'Using functions to make pie',
          lessonId: 1,
          testable: false
        },
        {
          AdminCtx
        }
      )
    ).rejects.toThrow(new Error('Not authorized to change'))
  })
  test('it should check if testStr is present with testable ', () => {
    expect(
      updateExercise(
        {},
        {
          content: 'testing',
          name: 'Using functions to make pie',
          lessonId: 1,
          testable: true
        },
        {
          req: { user: { id: 3 } }
        }
      )
    ).rejects.toThrow(new Error('Testable must have test string'))
  })
  test('It should check user ', () => {
    expect(
      updateExercise(
        {},
        {
          content: 'testing',
          name: 'Using functions to make pie',
          lessonId: 1,
          testable: false,
          authorId: 2
        },
        {
          req: { user: { id: 333 } }
        }
      )
    ).rejects.toThrow(new Error('Not authorized to delete'))
  })
})
describe('It should test delete', () => {
  test('it should delete module', () => {
    prismaMock.exercise.delete.mockResolvedValue({ success: true })
    expect(deleteExercise({}, { id: 1 }, AdminCtx)).resolves.toEqual({
      success: true
    })
  })
  test('should check id when deleting', () => {
    expect(
      deleteExercise(
        {},
        {
          id: 1
        },
        {
          req: { user: {} }
        }
      )
    ).rejects.toThrow(new Error('No User'))
  })
  test('It should check if user is signed in', () => {
    expect(
      updateExercise(
        {},
        {
          content: 'testing',
          name: 'Using functions to make pie',
          lessonId: 1,
          testable: false
        },
        {
          AdminCtx
        }
      )
    ).rejects.toThrow(new Error('Not authorized to delete'))
  })
  test('It should check if user is signed in', () => {
    expect(
      deleteExercise(
        {},
        {
          content: 'testing',
          name: 'Using functions to make pie',
          lessonId: 1,
          testable: false,
          authorId: 2
        },
        {
          req: { user: { id: 333 } }
        }
      )
    ).rejects.toThrow(new Error('Not authorized to delete'))
  })
})
