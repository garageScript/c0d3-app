import { promises as fs } from 'fs'
import { getDocSlugs, getDocGithubFilePath, getDocContent } from './docs'
import path from 'path'

jest.mock('fs', () => {
  return {
    promises: {
      readdir: jest.fn(),
      readFile: jest.fn()
    }
  }
})
describe('Static Docs Helpers', () => {
  describe('getDocSlugs', () => {
    test('should return docs slugs', () => {
      fs.readdir.mockResolvedValue(['doc_1.mdx', 'some_other_doc.mdx'])

      expect(getDocSlugs()).resolves.toEqual([
        { docSlug: 'doc_1' },
        { docSlug: 'some_other_doc' }
      ])
      expect(fs.readdir).toHaveBeenCalled()
    })

    test('should throw error on non URI character file names', () => {
      fs.readdir.mockResolvedValue(['no funny #!#&', 'js1'])

      expect(getDocSlugs()).rejects.toThrowError(/no funny #!#&/)
      expect(fs.readdir).toHaveBeenCalled()
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

      fs.readFile.mockResolvedValue(fakeFileContent)

      expect(getDocContent(slug)).resolves.toEqual(fakeFileContent)
      expect(fs.readFile).toBeCalledWith(path.join(process.cwd(), filePath))
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
