import { promises as fs } from 'fs'

jest.mock('fs', () => {
  return {
    promises: {
      readdir: jest.fn(),
      readFile: jest.fn()
    }
  }
})
import {
  getLessonSlugs,
  getSubLessonSlugs,
  getSubLessonGithubFilePath,
  getSubLessonContent
} from './lessons'
import path from 'path'

jest.mock('fs')

describe('Static Lessons Helpers', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('getLessonSlugs', () => {
    test('should return lesson slugs', () => {
      fs.readdir.mockResolvedValue(['js0', 'js1'])
      expect(getLessonSlugs()).resolves.toEqual([
        { lessonSlug: 'js0' },
        { lessonSlug: 'js1' }
      ])
      expect(fs.readdir).toHaveBeenCalled()
    })

    test('should throw error on non URI character file names', () => {
      fs.readdir.mockResolvedValue(['no funny #!#&', 'js1'])
      expect(getLessonSlugs()).rejects.toThrowError(/no funny #!#&/)
      expect(fs.readdir).toHaveBeenCalled()
    })
  })

  describe('getSubLessonSlugs', () => {
    test('should throw if lessonSlug is not URI encoded', () => {
      expect(getSubLessonSlugs('still f#@&ed')).rejects.toThrowError(
        /still f#@&ed/
      )
    })

    test('should throw if subLesson filenames is not URI encoded', () => {
      fs.readdir.mockResolvedValue([
        'some_good_title.mdx',
        'some bad title.mdx'
      ])

      expect(getSubLessonSlugs('js0')).rejects.toThrowError(/some bad title/)
      expect(fs.readdir).toHaveBeenCalled()
    })

    test('called without lessonSlug returns all { lessonSlug, subLessonSlug } pairs', () => {
      fs.readdir
        .mockResolvedValue(['lesson_title.mdx', 'title_two.mdx'])
        .mockResolvedValueOnce(['js0', 'js1'])

      expect(getSubLessonSlugs()).resolves.toEqual([
        { lessonSlug: 'js0', subLessonSlug: 'lesson_title' },
        { lessonSlug: 'js0', subLessonSlug: 'title_two' },
        { lessonSlug: 'js1', subLessonSlug: 'lesson_title' },
        { lessonSlug: 'js1', subLessonSlug: 'title_two' }
      ])
    })

    test('called with lessonSlug returns only slugs that match that lessonSlug', () => {
      fs.readdir.mockResolvedValue(['lesson_title.mdx', 'title_two.mdx'])

      expect(getSubLessonSlugs('js0')).resolves.toEqual([
        { lessonSlug: 'js0', subLessonSlug: 'lesson_title' },
        { lessonSlug: 'js0', subLessonSlug: 'title_two' }
      ])
    })
  })

  describe('getSubLessonGithubFilePath', () => {
    test('should return path from project root including mdx extension', () => {
      expect(
        getSubLessonGithubFilePath({
          lessonSlug: 'js30',
          subLessonSlug: 'some_other_title'
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

      fs.readFile.mockResolvedValue(fakeFileContent)

      expect(
        getSubLessonContent({
          lessonSlug: 'js0',
          subLessonSlug: 'some_title'
        })
      ).resolves.toEqual(fakeFileContent)

      expect(fs.readFile).toBeCalledWith(path.join(process.cwd(), filePath))
    })
  })
})
