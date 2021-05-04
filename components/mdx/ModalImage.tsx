import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Image, { ImageProps } from 'next/image'

const ModalImage: React.FC<
  ImageProps & { long?: string | boolean; tall?: string | boolean }
> = props => {
  const [show, setShow] = useState(false)
  const handle = (state: boolean) => () => setShow(state)
  return (
    <>
      <Image className="mdx-image" {...props} onClick={handle(true)} />
      <Modal
        className="mdx-modal-image"
        show={show}
        onHide={handle(false)}
        centered
        onClick={handle(false)}
      >
        <Modal.Body>
          <img
            src={props.src}
            className={`${props.tall ? 'tall' : props.long ? 'long' : ''}`}
          />
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ModalImage
