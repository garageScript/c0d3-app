import React from 'react'
import Layout from '../Layout'
import LessonTitleCard, {
  LessonTitleProps
} from '../../components/LessonTitleCard'
import styles from '../../scss/mdx.module.scss'
import { useRouter } from 'next/router'
type LayoutProps = Partial<LessonTitleProps & {subLessons?: string[] }>
const LessonLayout: React.FC<LayoutProps> = props => {
  const router = useRouter()
  const location = router.pathname.split('/')
  const current = location[location.length - 1]
  const lessonParts = props.subLessons&&props.subLessons.map((l, i) => {
    const url = l.toLowerCase().split(' ').join('_')
    return (
      <a
        className={`${styles['subtitle']} ${
          url !== current ? 'text-muted' : `text-dark dark`
        } d-block`}
        href={url}
        key={url}
      >
        {`Part ${i + 1}: ${l}`}
      </a>
    )
  })
  return (
    <Layout>
      <div className="mt-4">
        {props.lessonTitle && (
          <LessonTitleCard {...(props as LessonTitleProps)} />
        )}
      </div>
      <div
        className={`${styles['lesson-wrapper']} card shadow-sm mt-3 d-block border-0 p-3 p-md-4 bg-white`}
      >
        <div className={styles.title}>{props.lessonTitle}</div>
        {lessonParts}
        {props.children}
      </div>
    </Layout>
  )
}
export default LessonLayout
