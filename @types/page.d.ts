import { NextPage } from 'next'
import { ReactElement, ReactNode } from 'react'

export type LayoutGetter = (page: ReactElement, pageProps?: {}) => ReactNode
export interface WithLayout {
  getLayout: LayoutGetter
}

export type Page<P = {}> = NextPage<P> & {
  getLayout?: LayoutGetter
}
