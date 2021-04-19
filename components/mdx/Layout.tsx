import React from 'react'
import Layout from '../Layout'
import LessonTitleCard, {
  LessonTitleProps
} from '../../components/LessonTitleCard'
const LessonLayout: React.FC<Partial<LessonTitleProps>> = props => {
  return (
    <Layout>
      <div className="mt-4">
        {props.lessonTitle && (
          <LessonTitleCard {...(props as LessonTitleProps)} />
        )}
      </div>
      <div className={`card shadow-sm mt-3 d-block border-0 p-4 bg-white`}>
        {props.children}
      </div>
    </Layout>
  )
}
export default LessonLayout
