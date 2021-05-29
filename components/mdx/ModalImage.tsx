import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Image, { ImageProps } from 'next/image'

type Proportions = 'long' | 'tall'

const ModalImage: React.FC<ImageProps & { proportions?: Proportions }> =
  props => {
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
              className={`${props.proportions || 'mdx-modal__inner-image'}`}
            />
          </Modal.Body>
        </Modal>
      </>
    )
  }

export default ModalImage
