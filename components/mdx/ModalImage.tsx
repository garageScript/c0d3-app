import * as React from 'react'
import Modal from 'react-bootstrap/Modal'
type Props = {
  src: string
}
const Image: React.FC<Props> = (props: any) => {
  const [show, setShow] = React.useState(false)
  return (
    <>
      <img className="mdx-image" {...props} onClick={() => setShow(true)} />
      <Modal className="mdx-modal-image" show={show} centered>
        <Modal.Dialog>
          <Modal.Body>
            <img {...props} onClick={() => setShow(false)} />
          </Modal.Body>
        </Modal.Dialog>
      </Modal>
    </>
  )
}

export default Image
