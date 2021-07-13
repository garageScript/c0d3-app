import matter from 'gray-matter'
import Link from 'next/link'
import path from 'path'
import Layout from '../../components/Layout'
import { postFilePaths, POSTS_PATH } from '../utils/mdxUtils'
import { getAllLessonPaths } from '../../lib/getAllLessonsPaths'
import { getLessonMDXSource } from '../../lib/getAllLessonsPaths'
export default function Index({ posts }) {
  return (
    <Layout>
      {/* <h1>Home Page</h1>
      <p>
        Click the link below to navigate to a page generated by{' '}
        <code>next-mdx-remote</code>.
      </p>
      <ul>
        {posts.map(post => (
          <li key={post.filePath}>
            <Link
              as={`/posts/${post.filePath.replace(/\.mdx?$/, '')}`}
              href={`/posts/[slug]`}
            >
              <a>{post.data.title}</a>
            </Link>
          </li>
        ))}
      </ul> */}
    </Layout>
  )
}

export function getStaticProps() {
  const lessons = postFilePaths.map(filePath => {
    const source = fs.readFileSync(path.join(POSTS_PATH, filePath))
    const { content, data } = matter(source)

    return {
      content,
      data,
      filePath
    }
  })

  return { props: { lessons } }
}
