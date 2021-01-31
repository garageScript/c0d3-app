import React from 'react'
import '../scss/modalCard.scss'
import { Button } from './theme/Button'

export const Thanks: React.FC<{ close: Function }> = ({ close }) => (
  <div className="d-flex justify-content-center align-items-center flex-column modal-height-med">
    <img className="h-25 w-25" src="/curriculumAssets/icons/success.svg" />
    <h2 className="mt-4 mb-4 pt-3 pb-3 font-weight-bold text-center">
      Thanks for letting us know!
    </h2>
    <Button type="primary" color="white" size="lg" onClick={close}>
      Done
    </Button>
  </div>
)
