import * as React from 'react'
import AppNav from '../components/AppNav'

const IndexPage: React.FC = () => {
  return (
    <div className="h-screen">
      <AppNav />
      <div className="block">
        <h2 className="text-purple-400 block">Under Construction</h2>
      </div>
      <style jsx>
        {`
          h2 {
            font-size: 1.6rem;
          }
        `}
      </style>
    </div>
  )
}

export default IndexPage
