import React from 'react'
import type { ImageProps } from 'next/image'
import _ from 'lodash'

const Image = (props: ImageProps) => {
  //not all Image properties are allowed in <img/> tag
  const copy = _.omit(props, 'objectFit')
  return <img {...copy} />
}

export default Image
