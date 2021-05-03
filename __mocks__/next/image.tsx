import React from 'react'
import type { ImageProps } from 'next/image'
import _ from 'lodash'

const Image = (props: ImageProps) => {
  /*not all Image properties are allowed in <img/> tag
  ObjectFit causes warnings, but otherwise lessons/error images won't keep their dimensions 
  see https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit*/
  const copy = _.omit(props, 'objectFit')
  return <img {...copy} />
}

export default Image
