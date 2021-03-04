import * as React from 'react'
import MdxImage from '../../components/Image'

export default {
  title: 'Components/Image',
  component: MdxImage
}

export const Image: React.FC = () => (
  <MdxImage src="/assets/curriculum/lessons/devSetup/inspect.png" />
)
