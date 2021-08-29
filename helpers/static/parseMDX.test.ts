import { parseMDX } from './parseMDX'

describe('parseMDX', () => {
  const fakeFileContents = Buffer.from(
    `---
title: the title
order: 0
---
# some mdx content
not validated at this point <Custom>blah</Custom>
`,
    'utf-8'
  )

  test('should return front matter and parsed mdx source', async () => {
    expect(await parseMDX(fakeFileContents)).toEqual({
      frontMatter: { title: 'the title', order: 0 },
      source: { compiledSource: expect.any(String), scope: {} }
    })
  })
  test('should only return front matter  with onlyFront true', async () => {
    expect(await parseMDX(fakeFileContents, true)).toEqual({
      frontMatter: { title: 'the title', order: 0 }
    })
  })
})
