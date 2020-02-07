import React from 'react'
import renderer from 'react-test-renderer'
import LandingNav from '../../../components/LandingNav'
import LandingHero from '../../../components/LandingHero'
import LandingWhy from '../../../components/LandingWhy'

describe('Landing Page', () => {
  it('<LandingNav />', () => {
    const component = renderer.create(<LandingNav />).toJSON()
    expect(component).toMatchSnapshot()
  })
  it('<LandingHero />', () => {
    const component = renderer.create(<LandingHero />).toJSON()
    expect(component).toMatchSnapshot()
  })
  it('<LandingWhy />', () => {
    const component = renderer.create(<LandingWhy />).toJSON()
    expect(component).toMatchSnapshot()
  })
})
