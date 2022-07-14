import React from 'react'
type Props = {
  name?: string
}
const Spoiler: React.FC<Props> = ({ children, name }) => {
  return (
    <details className="mb-4">
      <summary>{name || 'Answer'}</summary>
      <div className="ms-4">{children}</div>
    </details>
  )
}

export default Spoiler
