/**
 * @jest-environment node
 */

jest.mock('./admin/adminHelpers')
import { errorCheckSingleField } from './admin/adminHelpers'
import { formChange } from './formChange'
const setState = jest.fn()
describe('formChange helper function', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  test('should call errorCheckSingleField if item is not an array', async () => {
    await formChange('hi', 0, [{ value: 'lol' }], setState, 'ji')
    expect(errorCheckSingleField).toHaveBeenCalledTimes(1)
  })

  test('should not call errorCheckSingleField if item is an array', async () => {
    await formChange(
      'hi',
      0,
      [{ value: [{ title: 'lol' }, { title: 'hi' }] }],
      setState
    )
    expect(errorCheckSingleField).toHaveBeenCalledTimes(0)
    expect(setState).toBeCalledWith([
      { value: [{ title: 'hi' }, { title: 'lol' }] }
    ])
  })
})
