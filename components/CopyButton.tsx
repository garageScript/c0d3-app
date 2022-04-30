import React, { useState } from 'react'
import { Button } from './theme/Button'
import { AlertIcon, CheckIcon, CopyIcon } from '@primer/octicons-react'
import * as Sentry from '@sentry/react'
import { ColorTypes } from './theme/colors'

enum State {
  NotCopied,
  Copied,
  Error
}

enum ColorType {
  Primary = 'primary',
  Info = 'info',
  Success = 'success',
  Mute = 'mute'
}

const CopyButton: React.FC<{ value: string }> = ({
  value
}: {
  value: string
}) => {
  const [copyState, setCopyState] = useState<State>(State.NotCopied)
  const [type, setType] = useState(ColorType.Mute)

  const showSuccess = () => {
    setTimeout(() => {
      setCopyState(State.NotCopied)
      setType(ColorType.Mute)
    }, 2000)

    return <CheckIcon />
  }

  const handleOnClick = async () => {
    try {
      setType(ColorType.Mute)
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
    <Button
      outline
      type={type}
      color={type as ColorTypes}
      onClick={handleOnClick}
    >
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
