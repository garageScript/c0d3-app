import React from 'react'
import { Button } from '../theme/Button'

const Thanks: React.FC<{ close: Function }> = ({ close }) => (
  <div className="d-flex justify-content-center align-items-center flex-column modal-height-med">
    <img className="h-25 w-25" src="/assets/curriculum/icons/success.svg" />
    <h2 className="mt-4 mb-4 pt-3 pb-3 fw-bold text-center">
      Thanks for letting us know!
    </h2>
    <Button
      btnType="primary"
      color="white"
      size="lg"
      onClick={() => {
        close()
      }}
    >
      Done
    </Button>
  </div>
)

export default Thanks
