import * as React from 'react'
import MdxImage from '../../../components/mdx/ModalImage'

export default {
  title: 'mdx/ModalImage',
  component: MdxImage
}

export const Image: React.FC = () => (
  <MdxImage src="/assets/landing/header-01.svg" />
)
