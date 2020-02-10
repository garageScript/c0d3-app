import React from 'react'
import renderer from 'react-test-renderer'
import Card from '../../../components/Card'

describe('Snapshot for Card', () => {
  test('Card', () => {
    const component = renderer.create(<Card title="Title of the card" />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('Card with Text', () => {
    const component = renderer.create(
      <Card
        title="Title of the card"
        text="Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."
      />
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('Card with Childrens', () => {
    const component = renderer.create(
      <Card
        title="Title of the card"
        text="Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."
      >
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-default">
              Default
            </span>
          </div>
          <input
            type="text"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
          />
          <div className="col-5">
            <button type="button" className="btn btn-dark">
              Primary
            </button>
          </div>
        </div>
      </Card>
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('Card with Success', () => {
    const component = renderer.create(
      <Card
        success
        title="Title of the card"
        text="Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."
      />
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
