import * as React from 'react'
import Layout from './Layout'

const LessonLayout: React.FC<{}> = ({ children }) => {
  return (
    <>
      <Layout>
        <div className={`card shadow-sm mt-3 d-block 'border-0`}>
          <div
            className="container"
            style={{ background: 'white', padding: '1em' }}
          >
            {children}
          </div>
        </div>
      </Layout>
    </>
  )
}
export default LessonLayout
