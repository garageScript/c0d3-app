import React from 'react'
import Modal from 'react-bootstrap/Modal'

export enum ModalSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large'
}

export interface ModalCardProps {
  show: boolean
  close: Function
  hideable?: boolean
  size?: ModalSize
}

export const ModalCard: React.FC<ModalCardProps> = ({
  show,
  close,
  hideable = true,
  size = 'medium',
  children
}) => {
  let closeModalIcon = (
    <img
      className="btn position-absolute exitBtn"
      src={'/assets/curriculum/icons/exit.svg'}
      onClick={() => close()}
    />
  )
  if (!hideable) {
    closeModalIcon = <></>
  }
  return (
    <Modal show={show} onHide={close} dialogClassName={size}>
      {closeModalIcon}
      {children}
    </Modal>
  )
}
