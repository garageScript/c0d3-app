/**
 * @jest-environment node
 */

import * as adminHelpers from './adminHelpers'
import {
  getPropertyArr,
  errorCheckSingleField,
  errorCheckAllFields
} from './adminHelpers'
jest.mock('yup')
import { reach } from 'yup'
reach.mockReturnValue({
  validate: jest.fn()
})
const dropdownMenuItems = [
  { title: 'Lessons', as: 'button' },
  { title: 'Users', as: 'button' },
  { title: 'Alerts', as: 'button' }
]

describe('adminHelper function', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should return correct results in getPropertyArr function', async () => {
    const testFunc = jest.fn()
    const res = getPropertyArr(
      {
        description: 'lol',
        bam: 'bam',
        deem: [],
        potate: 0,
        cactus: undefined
      },
      ['bam'],
      testFunc
    )
    expect(res).toEqual([
      { title: 'description', type: 'MD_INPUT', value: 'lol' },
      {
        title: 'deem',
        type: 'DROP_DOWN',
        value: []
      },
      { title: 'potate', type: 'TEXT_AREA', value: '0' },
      { title: 'cactus', type: 'TEXT_AREA', value: '' }
    ])

    const res2 = getPropertyArr(
      { deem: dropdownMenuItems },
      undefined,
      testFunc
    )
    res2[0].value[0].onClick()
    expect(testFunc).toBeCalledWith('Lessons', 0)
  })

  test('should return correct results in makegraphql variable function', async () => {
    const res = adminHelpers.makeGraphqlVariable(
      [
        { title: 'id', value: '4' },
        {
          title: 'deem',
          type: 'DROP_DOWN',
          value: [{ title: 'dragon' }]
        },
        { title: 'order', value: '5' }
      ],
      { pop: 'open' }
    )
    expect(res).toEqual({
      variables: { deem: 'dragon', id: 4, order: 5, pop: 'open' }
    })

    const res2 = adminHelpers.makeGraphqlVariable([
      { title: 'order', value: '' },
      { title: 'id', value: '' }
    ])
    expect(res2).toEqual({
      variables: { order: undefined, id: NaN }
    })
  })

  test('should delete error property(if present) when theres no error \
	and display error Message when error is found', async () => {
    const mockProperties = [{ title: 'hi', value: '4', error: 'lolz' }]
    const mockSchemaValidation = jest.fn()
    adminHelpers.makeGraphqlVariable = jest.fn().mockReturnValue({
      variables: {
        deem: 'dragon',
        id: 4,
        order: 5,
        pop: 'open'
      }
    })

    const res = await errorCheckSingleField(
      mockProperties,
      0,
      mockSchemaValidation
    )
    expect(res).toEqual(true)
    expect(mockProperties).toEqual([{ title: 'hi', value: '4' }])

    reach.mockReturnValue({
      validate: jest.fn().mockImplementation(() => {
        throw new Error('hello my friend u have an error')
      })
    })
    const res2 = await errorCheckSingleField(
      mockProperties,
      0,
      mockSchemaValidation
    )
    expect(res2).toEqual(false)
    expect(mockProperties).toEqual([
      { title: 'hi', value: '4', error: 'hello my friend u have an error' }
    ])
  })

  test('should return correct results in errorCheckAllFields function', async () => {
    const mockProperties = [{ title: 'hi', value: '4' }]
    const mockSchemaValidation = {
      validate: jest.fn()
    }
    adminHelpers.makeGraphqlVariable = jest.fn().mockReturnValue({
      variables: {
        deem: 'dragon',
        id: 4,
        order: 5,
        pop: 'open'
      }
    })

    const res = await errorCheckAllFields(mockProperties, mockSchemaValidation)
    expect(res).toEqual(true)
    expect(mockProperties).toEqual([{ title: 'hi', value: '4' }])

    class CustomError extends Error {
      constructor(custom, ...params) {
        // Pass remaining arguments (including vendor specific ones) to parent constructor
        super(...params)
        this.errors = custom.errors
        this.inner = custom.inner
      }
    }

    mockSchemaValidation.validate.mockImplementation(() => {
      throw new CustomError({ inner: [{ path: 'hi' }], errors: ['hi'] })
    })
    const res2 = await errorCheckAllFields(mockProperties, mockSchemaValidation)
    expect(res2).toEqual(false)
    expect(mockProperties).toEqual([{ title: 'hi', value: '4', error: 'hi' }])
  })
})
