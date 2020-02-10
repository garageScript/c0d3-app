import React from 'react'
import { addParameters } from '@storybook/react'
import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport'
import Layout from '../components/Layout'

const customViewports = {
  LaptopHiDPI: {
    name: 'Laptop HiDPI',
    styles: {
      width: '1440px',
      height: '900px'
    }
  },
  HD4K: {
    name: 'HD 4K',
    styles: {
      width: '2560px',
      height: '732px'
    }
  }
}

addParameters({
  viewport: {
    viewports: { ...customViewports, ...MINIMAL_VIEWPORTS },
    defaultViewport: 'LaptopHiDPI'
  }
})

export default {
  component: Layout,
  title: 'Layout'
}

export const withLayout: React.FC = () => {
  return (
    <Layout>
      <div className="row" style={{ height: '100vh' }}>
        <div className="card col-6">
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">
              Some quick example text to build on the card title and content.
            </p>
            <a href="#" className="btn btn-primary">
              Go somewhere
            </a>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const withoutLayout: React.FC = () => {
  return (
    <div className="row" style={{ height: '100vh' }}>
      <div className="card col-6">
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <p className="card-text">
            Some quick example text to build on the card title and content.
          </p>
          <a href="#" className="btn btn-primary">
            Go somewhere
          </a>
        </div>
      </div>
    </div>
  )
}
