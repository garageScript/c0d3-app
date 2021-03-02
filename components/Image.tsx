import * as React from 'react'
import Modal from 'react-bootstrap/Modal'

const Image: React.FC<{}> = (props: any) => {
  const [show, setShow] = React.useState(false)
  return (
    <>
      <img
        src={props.src}
        style={{
          maxHeight: '50vh',
          maxWidth: '100%'
        }}
        onClick={() => setShow(true)}
      />
      <Modal show={show} style={{ overflow: 'scroll' }} centered>
        <Modal.Dialog>
          <Modal.Body>
            <img src={props.src} onClick={() => setShow(false)} />
          </Modal.Body>
        </Modal.Dialog>
      </Modal>
    </>
  )
}

export default Image
