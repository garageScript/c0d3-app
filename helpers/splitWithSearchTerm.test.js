/**
 * @jest-environment node
 */

import { splitWithSearchTerm } from './splitWithSearchTerm'

describe('splitWithSearchTerm helper function', () => {
  test('Should produce array matching original capitalization of string', () => {
    const str = 'hiNgaDiNGADuurgen'
    const result = ['hiNga', 'DiNGA', 'Duurgen']
    const searchTerm1 = 'dinga'
    const searchTerm2 = 'dINga'
    const searchTerm3 = 'DINGA'
    const splitArr1 = splitWithSearchTerm(str, searchTerm1)
    const splitArr2 = splitWithSearchTerm(str, searchTerm2)
    const splitArr3 = splitWithSearchTerm(str, searchTerm3)
    expect(splitArr1).toEqual(result)
    expect(splitArr2).toEqual(result)
    expect(splitArr3).toEqual(result)
  })
})
