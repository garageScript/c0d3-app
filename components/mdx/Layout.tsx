import React from 'react'
import Layout from '../Layout'
import LessonTitleCard, {
  LessonTitleProps
} from '../../components/LessonTitleCard'
import styles from '../../scss/mdx.module.scss'
const LessonLayout: React.FC<Partial<LessonTitleProps>> = props => {
  return (
    <Layout>
      <div className="mt-4">
        {props.lessonTitle && (
          <LessonTitleCard {...(props as LessonTitleProps)} />
        )}
      </div>
      <div
        className={`${styles['lesson-wrapper']} card shadow-sm mt-3 d-block border-0 p-4 bg-white`}
      >
        <h1 className="title font-weight-bold">{props.lessonTitle}</h1>
        {props.children}
      </div>
    </Layout>
  )
}
export default LessonLayout
