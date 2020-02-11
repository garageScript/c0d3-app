import React from 'react'

type Props = {
  footerType?: string
}

const Footer: React.FC<Props> = ({ footerType }) => {
  const footerClass = footerType
    ? `font-weight-light text-center ${footerType}`
    : `mt-5 font-weight-light text-center pb-5 text-secondary`
  return (
    <footer className={footerClass}>
      &copy; Copyright 2020 GarageScript
      <br />
      All Rights Reserved
    </footer>
  )
}

export default Footer
