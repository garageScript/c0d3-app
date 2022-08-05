import React from 'react'

type Props = {
  primary?: boolean
  type?: 'success' | 'fail'
  text?: string
  classes?: string
  title: string
}

const iconProps = {
  className: 'mb-4',
  width: '100px',
  height: '100px'
}

const icons = {
  success: {
    src: '/assets/curriculum/icons/checked.svg',
    alt: 'Green circle with a checkmark inside.'
  },
  fail: {
    src: '/assets/curriculum/icons/exclamation.svg',
    alt: 'Dark red circle with a exclamation sign inside.'
  }
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
  const titleClasses =
    'card-title h2 fw-bold mb-5' + (primary ? ' text-primary' : '')
  const icon = type && icons[type]

  return (
    <div className="row mt-5">
      <div className={`card shadow-sm ${classesList}`}>
        <div className="card-body text-center pt-5 pb-5">
          {icon && <img src={icon.src} alt={icon.alt} {...iconProps} />}
          <h1 className={titleClasses}>{title}</h1>
          <p className="card-text">{text}</p>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Card
