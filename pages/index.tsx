import * as React from 'react'
import AppNav from '../components/AppNav'

const IndexPage: React.FC = () => {
  return (
    <div>
      <AppNav />
      <h2 className="text-purple-400">
        Under Construction
        <style jsx>{`
          h2 {
            font-size: 1.6rem;
          }
        `}</style>
      </h2>
    </div>
  )
}

export default IndexPage
