import React from 'react'

type Props = {
  footerType?: string
}

const Footer: React.FC<Props> = ({ footerType }) => {
  const footerClass = footerType
    ? `fw-light text-center ${footerType}`
    : `mt-5 fw-light text-center pb-5 text-muted`
  return (
    <footer className={footerClass}>&copy; Copyright 2022 GarageScript</footer>
  )
}

export default Footer
