import React, { useState } from 'react'
import { ModalCard } from '../../components/ModalCard'
import Thanks from '../../components/Thanks'
import { Button } from '../../components/theme/Button'
import noop from '../../helpers/noop'

export default {
  component: Thanks,
  title: 'Components/Thanks'
}

const MockBasic = () => (
  <div className="row mt-5 d-flex justify-content-center">
    <div className="card shadow-sm">
      <div className="text-center ps-4 pe-4">
        <Thanks close={noop} />
      </div>
    </div>
  </div>
)

const MockModal = () => {
  const [show, setShow] = useState(true)
  const close = () => setShow(false)
  return (
    <>
      <Button onClick={() => setShow(true)}>Launch demo modal</Button>
      <ModalCard show={show} close={close}>
        <Thanks close={close} />
      </ModalCard>
    </>
  )
}

export const Basic = () => <MockBasic />

export const Modal = () => <MockModal />
