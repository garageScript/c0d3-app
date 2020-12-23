import _ from 'lodash'
import React, { useState } from 'react'
import { ModalCard, ModalSize } from '../../components/ModalCard'
import { Button } from '../../components/theme/Button'

export default {
  component: ModalCard,
  title: 'Components/ModalCard'
}

const MockSize: React.FC<{ size: ModalSize }> = ({ size }) => {
  const [show, setShow] = useState(true)
  return (
    <>
      <Button onClick={() => setShow(true)}>Launch demo modal</Button>
      <ModalCard size={size} show={show} close={() => setShow(false)}>
        <h1 className="text-center">{_.capitalize(size)}</h1>
      </ModalCard>
    </>
  )
}

export const Small = () => <MockSize size={ModalSize.SMALL} />

export const Medium = () => <MockSize size={ModalSize.MEDIUM} />

export const Large = () => <MockSize size={ModalSize.LARGE} />
