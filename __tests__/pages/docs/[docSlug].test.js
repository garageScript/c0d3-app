import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { dummyDocFileContent, dummyParsedDocMdx } from '../../../__dummy__/mdx'
import Docs, {
  getStaticProps,
  getStaticPaths
} from '../../../pages/docs/[docSlug]'
import { getLayout } from '../../../components/Layout'
import {
  getDocSlugs,
  getDocGithubFilePath,
  getDocContent
} from '../../../helpers/static/docs'
jest.mock('../../../helpers/static/docs')
import { parseMDX } from '../../../helpers/static/parseMDX'
jest.mock('../../../helpers/static/parseMDX')
import Title from '../../../components/Title'
jest.mock('../../../components/Title', () => {
  return jest.fn(() => null)
})

import { useRouter } from 'next/router' // Auto mocked

describe('[docSlug]', () => {
  const fakeGithubPath = 'some/fake/path'

  beforeEach(() => {
    jest.clearAllMocks()
  })
  describe('getStaticPaths', () => {
    test('should call getDocsSlugs helper function and return paths w/ fallback false', async () => {
      getDocSlugs.mockImplementation(() => [
        { docSlug: 'some_doc' },
        { docSlug: 'some_doc_two' }
      ])

      expect(await getStaticPaths()).toEqual({
        paths: [
          { params: { docSlug: 'some_doc' } },
          { params: { docSlug: 'some_doc_two' } }
        ],
        fallback: false
      })
    })
  })
  describe('getStaticProps', () => {
    test('should throw when called with no slug', async () => {
      await expect(() => getStaticProps({ params: {} })).rejects.toThrowError(
        /Missing Slug/
      )
    })

    test('should return correct props', async () => {
      getDocGithubFilePath.mockReturnValue(fakeGithubPath)
      getDocContent.mockReturnValue(dummyDocFileContent)
      parseMDX.mockResolvedValue(dummyParsedDocMdx)

      const docSlug = 'some_doc'
      expect(await getStaticProps({ params: { docSlug } })).toEqual({
        props: {
          ...dummyParsedDocMdx,
          docFilePath: fakeGithubPath
        }
      })
      expect(getDocGithubFilePath).toHaveBeenCalledWith(docSlug)
      expect(getDocContent).toHaveBeenCalledWith(docSlug)
    })
  })

  describe('Page', () => {
    test('Should use getLayout from Layout component', () => {
      expect(Docs.getLayout).toBe(getLayout)
    })

    test('should render functioning "Go Back" button', async () => {
      const { back } = useRouter()
      render(<Docs {...dummyParsedDocMdx} docFilePath={fakeGithubPath} />)

      expect(back).not.toHaveBeenCalled()
      await userEvent.click(screen.getByRole('button', { name: 'Go Back' }))
      expect(back).toHaveBeenCalled()
    })

    test('should render EditPage component with link to docFilePath', () => {
      render(<Docs {...dummyParsedDocMdx} docFilePath={fakeGithubPath} />)
      expect(screen.getByRole('link')).toHaveAttribute(
        'href',
        expect.stringContaining(fakeGithubPath)
      )
    })

    test('should display default document title when no frontMatter.title is provided', () => {
      render(
        <Docs
          frontMatter={{}}
          source={dummyParsedDocMdx.source}
          docFilePath={fakeGithubPath}
        />
      )

      expect(Title).toHaveBeenCalledWith({ title: 'C0D3 | Docs' }, {})
    })

    test('should render Title component with frontMatter.title', () => {
      render(<Docs {...dummyParsedDocMdx} docFilePath={fakeGithubPath} />)

      expect(Title).toHaveBeenCalledWith(
        {
          title: expect.stringContaining(dummyParsedDocMdx.frontMatter.title)
        },
        {}
      )
    })

    test('should render functioning MDX content', async () => {
      render(<Docs {...dummyParsedDocMdx} docFilePath={fakeGithubPath} />)

      // Spoiler component renders into details / summary html elements
      const detailsElement = screen.getByRole('group')

      expect(detailsElement).not.toHaveAttribute('open')
      await userEvent.click(screen.getByText('what am i?'))
      expect(detailsElement).toHaveAttribute('open')
    })
    test('should match screenshot', () => {
      const { container } = render(
        <Docs {...dummyParsedDocMdx} docFilePath={fakeGithubPath} />
      )

      expect(container).toMatchSnapshot()
    })
  })
})
