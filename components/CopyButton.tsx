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

type Props = {
  value: string
  color?: 'success' | 'danger' | 'primary' | 'light' | 'info' | 'mute'
}

const CopyButton = ({ value, color }: Props) => {
  const bgColor = color || ColorType.Mute
  const [copyState, setCopyState] = useState<State>(State.NotCopied)
  const [type, setType] = useState(bgColor)

  const showSuccess = () => {
    setTimeout(() => {
      setCopyState(State.NotCopied)
      setType(bgColor)
    }, 2000)

    return <CheckIcon />
  }

  const handleOnClick = async () => {
    try {
      setType(bgColor)
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
      btnType={type}
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
