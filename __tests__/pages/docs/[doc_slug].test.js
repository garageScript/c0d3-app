import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Docs, {
  getStaticProps,
  getStaticPaths
} from '../../../pages/docs/[doc_slug]'
import { getLayout } from '../../../components/Layout'
import {
  getDocSlugs,
  getDocGithubFilePath,
  getDocContent
} from '../../../helpers/static/docs'
import { parseMDX } from '../../../helpers/static/parseMDX'
import Title from '../../../components/Title'

jest.mock('../../../components/Title', () => {
  return jest.fn(() => null)
})

import { useRouter } from 'next/router' // Auto mocked
jest.mock('../../../helpers/static/docs')

const fakeGithubPath = 'some/fake/path'
const fakeDocContent = Buffer.from(
  `---
title: fake doc
---

# markdown
<Spoiler name="what am i?"> mdx to jsx :)</Spoiler>
`,
  'utf-8'
)
let frontMatter, source
describe('[doc_slug] Page', () => {
  beforeAll(async () => {
    // Get real mdx to test proper mdx rendering
    const mdx = await parseMDX(fakeDocContent)
    frontMatter = mdx.frontMatter
    source = mdx.source
  })
  beforeEach(() => {
    jest.clearAllMocks()
  })
  describe('getStaticPaths', () => {
    test('should call getDocsSlugs helper function and return paths w/ fallback false', async () => {
      getDocSlugs.mockImplementation(() => [
        { doc_slug: 'some_doc' },
        { doc_slug: 'some_doc_two' }
      ])

      expect(await getStaticPaths()).toEqual({
        paths: [
          { params: { doc_slug: 'some_doc' } },
          { params: { doc_slug: 'some_doc_two' } }
        ],
        fallback: false
      })
    })
  })
  describe('getStaticProps', () => {
    test('should throw when called with no slug', async () => {
      await expect(getStaticProps({})).rejects.toThrowError()
    })

    test('should call getDocGithubFilePath, getDocContent and return props', async () => {
      getDocGithubFilePath.mockReturnValue(fakeGithubPath)
      getDocContent.mockReturnValue(fakeDocContent)
      expect(getDocGithubFilePath).not.toHaveBeenCalled()
      expect(getDocContent).not.toHaveBeenCalled()

      const doc_slug = 'some_doc'
      expect(await getStaticProps({ params: { doc_slug } })).toEqual({
        props: {
          source,
          frontMatter,
          docFilePath: fakeGithubPath
        }
      })
      expect(getDocGithubFilePath).toHaveBeenCalledWith(doc_slug)
      expect(getDocContent).toHaveBeenCalledWith(doc_slug)
    })
  })

  test('Should use getLayout from Layout component', async () => {
    expect(Docs.getLayout).toBe(getLayout)
  })

  test('should render functioning "Go Back" button', () => {
    const { back } = useRouter()
    render(
      <Docs
        frontMatter={frontMatter}
        source={source}
        docFilePath={fakeGithubPath}
      />
    )

    expect(back).not.toHaveBeenCalled()
    userEvent.click(screen.getByRole('button', { name: 'Go Back' }))
    expect(back).toHaveBeenCalled()
  })

  test('should render EditPage component with link to docFilePath', () => {
    render(
      <Docs
        frontMatter={frontMatter}
        source={source}
        docFilePath={fakeGithubPath}
      />
    )
    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      expect.stringContaining(fakeGithubPath)
    )
  })

  test('should display default document title and not render page title without frontMatter.title', () => {
    const { container } = render(
      <Docs frontMatter={{}} source={source} docFilePath={fakeGithubPath} />
    )

    expect(Title).toHaveBeenCalledWith(
      {
        title: 'C0D3 | Docs'
      },
      {}
    )
    expect(container).toMatchSnapshot()
  })

  test('should render Title component with frontMatter.title', () => {
    render(
      <Docs
        frontMatter={frontMatter}
        source={source}
        docFilePath={fakeGithubPath}
      />
    )

    expect(Title).toHaveBeenCalledWith(
      {
        title: expect.stringContaining(frontMatter.title)
      },
      {}
    )
  })

  test('should render functioning MDX content', async () => {
    const { container } = render(
      <Docs
        frontMatter={frontMatter}
        source={source}
        docFilePath={fakeGithubPath}
      />
    )

    // Spoiler component renders into details / summary html elements
    const detailsElement = screen.getByRole('group')

    expect(detailsElement).not.toHaveAttribute('open')
    userEvent.click(screen.getByText('what am i?'))
    expect(detailsElement).toHaveAttribute('open')

    expect(container).toMatchSnapshot()
  })
})
