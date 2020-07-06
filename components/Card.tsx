import React from 'react'
import { ReactComponent as Checked } from '../assets/images/checked.svg'
import { ReactComponent as Fail } from '../public/curriculumAssets/icons/exclamation.svg'

type Props = {
  children?: React.ReactNode
  type?: 'success' | 'fail'
  text?: string
  classes?: string
  title: string
}

const iconProps: { [type: string]: string } = {
  className: 'mb-4',
  width: '100px',
  height: '100px'
}

const icons: { [type: string]: React.FC } = {
  success: Checked,
  fail: Fail
}

const Card: React.FC<Props> = props => {
  const classes = `${props.classes ||
    'col-sm-8 col-md-7 col-lg-6 col-xl-6 m-auto px-md-5 border-0'}`
  const Icon = props.type ? icons[props.type] : null
  return (
    <div className="row mt-5">
      <div className={`card shadow-sm ${classes}`}>
        <div className="card-body text-center pt-5 pb-5">
          {Icon && <Icon {...iconProps} />}
          <h1 className="card-title h2 font-weight-bold mb-5">{props.title}</h1>
          <p className="card-text">{props.text}</p>
          {props.children}
        </div>
      </div>
    </div>
  )
}

export default Card
