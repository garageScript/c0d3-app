import React from 'react'
import LessonHeader from './LessonHeader'

const LessonLayout = ({ children, ...rest }) => (
  <>
    <LessonHeader {...rest} />
    {children}
  </>
)

export default LessonLayout
