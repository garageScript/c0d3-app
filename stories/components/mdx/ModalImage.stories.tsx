import React from 'react'
import MdxImage from '../../../components/mdx/ModalImage'

export default {
  title: 'mdx/ModalImage',
  component: MdxImage
}

export const Image: React.FC = () => (
  <MdxImage width={313} height={360} src="/assets/landing/header-01.svg" />
)
export const Kanban: React.FC = () => (
  <MdxImage width={1280} height={511} src="/challenges/assets/kanban.png" />
)
