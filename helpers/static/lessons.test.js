import fs from 'fs'
import {
  getLessonSlugs,
  getSubLessonSlugs,
  getSubLessonGithubFilePath,
  getSubLessonContent
} from './lessons'
jest.mock('fs')

describe('Static Lessons Helpers', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('getLessonSlugs', () => {
    test('should return lesson slugs', () => {
      fs.readdirSync.mockReturnValue(['js0', 'js1'])
      expect(getLessonSlugs()).toEqual([
        { lesson_slug: 'js0' },
        { lesson_slug: 'js1' }
      ])
      expect(fs.readdirSync).toHaveBeenCalled()
    })

    test('should throw error on non URI character file names', () => {
      fs.readdirSync.mockReturnValue(['no funny #!#&', 'js1'])
      expect(getLessonSlugs).toThrowError(/no funny #!#&/)
      expect(fs.readdirSync).toHaveBeenCalled()
    })
  })

  describe('getSubLessonSlugs', () => {
    test('should throw if lesson_slug is not URI encoded', () => {
      expect(() => {
        getSubLessonSlugs('still f#@&ed')
      }).toThrowError(/still f#@&ed/)
    })

    test('should throw if sublesson filenames is not URI encoded', () => {
      fs.readdirSync.mockReturnValue([
        'some_good_title.mdx',
        'some bad title.mdx'
      ])

      expect(() => {
        getSubLessonSlugs('js0')
      }).toThrowError(/some bad title/)
      expect(fs.readdirSync).toHaveBeenCalled()
    })

    test('called without lesson_slug returns all lesson_slug / sublesson_slugs', () => {
      fs.readdirSync
        .mockReturnValue(['lesson_title.mdx', 'title_two.mdx'])
        .mockReturnValueOnce(['js0', 'js1'])

      expect(getSubLessonSlugs()).toEqual([
        { lesson_slug: 'js0', sublesson_slug: 'lesson_title' },
        { lesson_slug: 'js0', sublesson_slug: 'title_two' },
        { lesson_slug: 'js1', sublesson_slug: 'lesson_title' },
        { lesson_slug: 'js1', sublesson_slug: 'title_two' }
      ])
    })

    test('called with lesson_slug returns only slugs that match that lesson_slug', () => {
      fs.readdirSync.mockReturnValue(['lesson_title.mdx', 'title_two.mdx'])

      expect(getSubLessonSlugs('js0')).toEqual([
        { lesson_slug: 'js0', sublesson_slug: 'lesson_title' },
        { lesson_slug: 'js0', sublesson_slug: 'title_two' }
      ])
    })
  })

  describe('getSubLessonGithubFilePath', () => {
    test('should return path from project root including mdx extension', () => {
      expect(
        getSubLessonGithubFilePath({
          lesson_slug: 'js30',
          sublesson_slug: 'some_other_title'
        })
      ).toBe('content/lessons/js30/sublesson/some_other_title.mdx')
    })
  })
  describe('getSubLessonContent', () => {
    test('should return sublesson file contents buffer', () => {
      const fakeFileContent = Buffer.from(
        'fake lesson file blah blah blah',
        'utf-8'
      )
      const filePath = 'content/lessons/js0/sublesson/some_title.mdx'

      fs.readFileSync.mockReturnValue(fakeFileContent)

      expect(
        getSubLessonContent({
          lesson_slug: 'js0',
          sublesson_slug: 'some_title'
        })
      ).toEqual(fakeFileContent)

      expect(fs.readFileSync).toBeCalledWith(expect.stringContaining(filePath))
    })
  })
})
