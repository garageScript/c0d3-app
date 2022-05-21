import { SessionProvider } from 'next-auth/react'
import React, { ReactElement } from 'react'

export const SessionProviderWrapper = ({
  children
}: {
  children: ReactElement
}) => (
  <SessionProvider
    session={{
      expires: '123'
    }}
  >
    {children}
  </SessionProvider>
)
