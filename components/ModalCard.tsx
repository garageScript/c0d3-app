import React from 'react'
import Modal from 'react-bootstrap/Modal'

export enum ModalSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large'
}

export interface ModalCardProps {
  show: boolean
  close: () => void
  hideable?: boolean
  size?: ModalSize
}

// https://react-bootstrap.github.io/components/modal/#static-backdrop
const STATIC = 'static'

export const ModalCard: React.FC<ModalCardProps> = ({
  show,
  close,
  hideable = true,
  size = 'medium',
  children
}) => {
  return (
    <Modal
      show={show}
      onHide={close}
      dialogClassName={size}
      backdrop={!hideable && STATIC}
      keyboard={hideable}
    >
      {hideable && (
        <img
          className="btn position-absolute exitBtn"
          src={'/assets/curriculum/icons/exit.svg'}
          onClick={() => close()}
          alt="exit"
        />
      )}
      {children}
    </Modal>
  )
}
