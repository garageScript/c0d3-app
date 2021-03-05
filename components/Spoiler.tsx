import * as React from 'react'
type Props = {
  name?: string
  offset?: string
}
const Spoiler: React.FC<Props> = ({ children, name, offset }) => {
  const [status, setStatus] = React.useState({
    css: { display: 'none' },
    name: 'spoiler_arrow__right'
  })
  const onClick = () => {
    status.css.display === 'none'
      ? setStatus({ css: { display: 'inherit' }, name: 'spoiler_arrow__down' })
      : setStatus({ css: { display: 'none' }, name: 'spoiler_arrow__right' })
  }
  return (
    <>
      <div
        className="mb-1"
        style={{ marginLeft: offset ? offset : '1em' }}
        onClick={onClick}
      >
        <div className="d-flex">
          <div className={`${status.name} align-self-center mr-3`} />
          <div className="spoiler__title">{name ? name : 'Answer'}</div>
        </div>
      </div>
      <div style={status.css}>{children}</div>
    </>
  )
}

export default Spoiler
