import React from 'react'
import renderer from 'react-test-renderer'
import Layout from '../../../components/Layout'

describe('Snapshot for Layout', () => {
  test('With Layout', () => {
    const component = renderer.create(
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
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
