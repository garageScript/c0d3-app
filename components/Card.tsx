import React from 'react'
import { ReactComponent as Checked } from '../assets/images/checked.svg'

type Props = {
  children?: React.ReactNode
  success?: boolean
  text?: string
  title: string
}

const Card: React.FC<Props> = props => (
  <div className="row mt-5">
    <div className="col-sm-5 m-auto" style={{ maxWidth: '604px' }}>
      <div className="card shadow-sm">
        <div className="card-body text-center pt-5 pb-5">
          {props.success && (
            <Checked className="mb-4" width="100px" height="100px" />
          )}
          <h1 className="card-title h2 font-weight-bold">{props.title}</h1>
          <p className="card-text">{props.text}</p>
          {props.children}
        </div>
      </div>
    </div>
  </div>
)

export default Card
