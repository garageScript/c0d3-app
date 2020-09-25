import React from 'react'
import Card from '../../components/Card'

export default {
  component: Card,
  title: 'Components/Card'
}

export const Basic: React.FC = () => <Card title="Title of the card" />

export const WithPrimary: React.FC = () => (
  <Card primary={true} title="Title of the card" />
)

export const WithText: React.FC = () => (
  <Card
    title="Title of the card"
    text="Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."
  />
)

export const WithChildren: React.FC = () => (
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
          Dark
        </button>
      </div>
    </div>
  </Card>
)

export const WithSuccess: React.FC = () => (
  <Card
    type="success"
    title="Title of the card"
    text="Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."
  />
)

export const WithFail: React.FC = () => (
  <Card
    type="fail"
    title="Title of the card"
    text="Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."
  />
)

export const WithClasses: React.FC = () => (
  <Card
    title="Title of the card"
    text="Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."
    classes="col-3 offset-8 bg-dark text-white-50 "
  />
)
