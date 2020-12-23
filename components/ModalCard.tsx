import React from 'react'
import Modal from 'react-bootstrap/Modal'
import '../scss/modalCard.scss'

export enum ModalSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large'
}

interface ModalCardProps {
  show: boolean
  close: Function
  size?: ModalSize
}

export const ModalCard: React.FC<ModalCardProps> = ({
  show,
  close,
  size = 'medium',
  children
}) => {
  return (
    <Modal show={show} onHide={close} dialogClassName={size}>
      <img
        className=".img-fluid btn position-absolute exitBtn"
        src={'/curriculumAssets/icons/exit.svg'}
        onClick={() => close()}
      />
      {children}
    </Modal>
  )
}
