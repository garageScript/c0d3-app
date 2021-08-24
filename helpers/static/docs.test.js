import fs from 'fs'
import { getDocSlugs, getDocGithubFilePath, getDocContent } from './docs'
jest.mock('fs')

describe('Static Docs Helpers', () => {
  describe('getDocSlugs', () => {
    test('should return docs slugs', () => {
      fs.readdirSync.mockReturnValue(['doc_1.mdx', 'some_other_doc.mdx'])

      expect(getDocSlugs()).toEqual([
        { docSlug: 'doc_1' },
        { docSlug: 'some_other_doc' }
      ])
      expect(fs.readdirSync).toHaveBeenCalled()
    })

    test('should throw error on non URI character file names', () => {
      fs.readdirSync.mockReturnValue(['no funny #!#&', 'js1'])

      expect(getDocSlugs).toThrowError(/no funny #!#&/)
      expect(fs.readdirSync).toHaveBeenCalled()
    })
  })
  describe('getDocContent', () => {
    test('should return doc file contents buffer', () => {
      const fakeFileContent = Buffer.from(
        'fake lesson file blah blah blah',
        'utf-8'
      )
      const slug = 'some_doc'
      const filePath = `content/docs/${slug}.mdx`

      fs.readFileSync.mockReturnValue(fakeFileContent)

      expect(getDocContent(slug)).toEqual(fakeFileContent)
      expect(fs.readFileSync).toBeCalledWith(expect.stringContaining(filePath))
    })
  })
  describe('getDocGithubFilePath', () => {
    test('should return path from project root including mdx extension', () => {
      expect(getDocGithubFilePath('a_doc_slug')).toBe(
        'content/docs/a_doc_slug.mdx'
      )
    })
  })
})
