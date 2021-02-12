import React from 'react'
import { ReactComponent as Checked } from '../assets/images/checked.svg'
import { ReactComponent as Fail } from '../public/assets/curriculum/icons/exclamation.svg'

type Props = {
  primary?: boolean
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

const Card: React.FC<Props> = ({
  primary,
  children,
  type,
  text,
  classes,
  title
}) => {
  const classesList =
    classes || 'col-sm-8 col-md-7 col-lg-6 col-xl-6 m-auto px-md-5 border-0'
  const Icon = type ? icons[type] : null
  const titleClasses =
    'card-title h2 font-weight-bold mb-5' + (primary ? ' text-primary' : '')

  return (
    <div className="row mt-5">
      <div className={`card shadow-sm ${classesList}`}>
        <div className="card-body text-center pt-5 pb-5">
          {Icon && <Icon {...iconProps} />}
          <h1 className={titleClasses}>{title}</h1>
          <p className="card-text">{text}</p>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Card
