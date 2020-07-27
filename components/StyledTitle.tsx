import React from 'react'

type StyledTitleProps = {
  children: any
}

export const StyledTitle: React.FC<StyledTitleProps> = ({ children }) => {
  return (
    <h1 style={{ margin: 20, color: '#5440d8', fontSize: '3.6rem' }}>
      {children}
    </h1>
  )
}
