import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Image, { ImageProps } from 'next/image'

const ModalImage: React.FC<ImageProps> = (props: ImageProps) => {
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
          <Image
            height={(props.height as number) * 2}
            width={(props.width as number) * 2}
            src={props.src}
          />
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ModalImage
