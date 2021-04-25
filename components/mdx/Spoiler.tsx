import React from 'react'
type Props = {
  name?: string
}
const Spoiler: React.FC<Props> = ({ children, name }) => {
  return (
    <details>
      <summary>{name || 'Answer'}</summary>
      {children}
    </details>
  )
}

export default Spoiler
