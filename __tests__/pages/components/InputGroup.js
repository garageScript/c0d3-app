import React from 'react'
import renderer from 'react-test-renderer'
import InputGroup from '../../../components/InputGroup'

describe('Snapshot for InputGroup', () => {
  test('Small InputGroup', () => {
    const component = renderer.create(<InputGroup size="small" />)
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('Default InputGroup', () => {
    const component = renderer.create(<InputGroup />)
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('Large InputGroup', () => {
    const component = renderer.create(<InputGroup size="large" />)
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('Large InputGroup', () => {
    const component = renderer.create(<InputGroup isDisabled />)
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
