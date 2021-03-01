import * as React from 'react'

const Image: React.FC<{}> = (props: any) => {
  return (
    <img src={props.src} style={{ maxHeight: '50vh', maxWidth: '100%' }}></img>
  )
}

export default Image
