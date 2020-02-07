import React from 'react'
import renderer from 'react-test-renderer'
import LandingNav from '../../../components/LandingNav'
import LandingPage from '../../../components/LandingPage'

describe('Landing', () => {
  it('<LandingNav />', () => {
    const component = renderer.create(<LandingNav />).toJSON()
    expect(component).toMatchSnapshot()
  })
  it('<LandingPage />', () => {
    const component = renderer.create(<LandingPage />).toJSON()
    expect(component).toMatchSnapshot()
  })
})
