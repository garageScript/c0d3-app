import { NextPage } from 'next'
import { ReactElement, ReactNode } from 'react'

export type layoutGetter = (page: ReactElement, pageProps?: {}) => ReactNode
export interface WithLayout {
  getLayout: layoutGetter
}

export type Page<P = {}> = NextPage<P> & {
  getLayout?: layoutGetter
}
