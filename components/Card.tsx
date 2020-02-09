import React from 'react'
import { ReactComponent as Checked } from '../assets/images/checked.svg'

type Props = {
  children?: React.ReactNode
  success?: boolean
  text?: string
  classes?: string
  title: string
}

const Card: React.FC<Props> = props => {
  const classes = `col-sm-${props.classes ||
    'col-sm-8 col-md-7 col-lg-6 col-xl-4 m-auto'}`
  return (
    <div className="row mt-5">
      <div className={`card shadow-sm ${classes}`}>
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
  )
}

export default Card
