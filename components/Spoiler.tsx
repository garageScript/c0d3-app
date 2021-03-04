import * as React from 'react'
type Props = {
  name?: string
  offset?: string
}
const Spoiler: React.FC<Props> = ({ children, name, offset }) => {
  const [status, setStatus] = React.useState({
    css: { display: 'none' },
    name: 'spoiler_arrow__down'
  })
  const onClick = () => {
    status.css.display === 'none'
      ? setStatus({ css: { display: 'inherit' }, name: 'spoiler_arrow__up' })
      : setStatus({ css: { display: 'none' }, name: 'spoiler_arrow__down' })
  }
  return (
    <>
      <div
        className="mb-1"
        style={{ marginLeft: offset ? offset : '1em' }}
        onClick={onClick}
      >
        {name ? name : 'Answer'}
        <div className={status.name} />
      </div>
      <div style={status.css}>{children}</div>
    </>
  )
}

export default Spoiler
