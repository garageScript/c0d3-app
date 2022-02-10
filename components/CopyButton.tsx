import React, { useState } from 'react'
import { Button } from './theme/Button'
import { AlertIcon, CheckIcon, CopyIcon } from '@primer/octicons-react'
import * as Sentry from '@sentry/react'

enum State {
  NotCopied,
  Copied,
  Error
}

enum ColorType {
  Primary = 'primary',
  Info = 'info',
  Success = 'success'
}

const CopyButton: React.FC<{ value: any }> = ({ value }: { value: any }) => {
  const [copyState, setCopyState] = useState<State>(State.NotCopied)
  const [type, setType] = useState<ColorType>(ColorType.Primary)

  const showSuccess = () => {
    setTimeout(() => {
      setCopyState(State.NotCopied)
      setType(ColorType.Primary)
    }, 2000)

    return <CheckIcon />
  }

  const handleOnClick = async () => {
    try {
      setType(ColorType.Primary)
      await navigator.clipboard.writeText(value)
      setCopyState(State.Copied)
      setType(ColorType.Success)
    } catch (e) {
      setCopyState(State.Error)
      setType(ColorType.Info)
      Sentry.captureException(e)
    }
  }

  return (
    <Button outline type={type} color={type} onClick={handleOnClick}>
      {copyState === State.Copied ? (
        showSuccess()
      ) : copyState === State.Error ? (
        <AlertIcon />
      ) : (
        <CopyIcon />
      )}
    </Button>
  )
}

export default CopyButton
