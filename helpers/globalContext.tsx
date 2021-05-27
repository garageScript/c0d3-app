import React, { createContext, useState } from 'react'
import { GetAppQuery } from '../graphql'
import dummySession from '../__dummy__/sessionData'

//default context value is used for testing https://reactjs.org/docs/context.html#reactcreatecontext
export const GlobalContext = createContext<{
  session: GetAppQuery['session'] | null
  setContext: React.Dispatch<any>
}>({
  session: dummySession,
  setContext: () => {}
})

export const ContextProvider: React.FC = ({ children }) => {
  const [context, setContext] = useState<GetAppQuery['session'] | null>(null)
  return (
    <GlobalContext.Provider value={{ session: context, setContext }}>
      {children}
    </GlobalContext.Provider>
  )
}
