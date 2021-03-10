// This is a test utility file for mocking Next Router for testing

import React from 'react'
import { RouterContext } from 'next/dist/next-server/lib/router-context'

export function withTestRouter(tree, router = {}) {
  const {
    route = '',
    pathname = '/not-root',
    query = {},
    asPath = '/not-root',
    push = async () => true,
    replace = async () => true,
    reload = () => null,
    back = () => null,
    prefetch = async () => undefined,
    beforePopState = () => null,
    isFallback = false,
    events = {
      on: () => null,
      off: () => null,
      emit: () => null
    }
  } = router

  return (
    <RouterContext.Provider
      value={{
        route,
        pathname,
        query,
        asPath,
        push,
        replace,
        reload,
        back,
        prefetch,
        beforePopState,
        isFallback,
        events
      }}
    >
      {tree}
    </RouterContext.Provider>
  )
}
