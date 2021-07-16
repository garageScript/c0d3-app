import { NextPage } from 'next'
import { ReactElement, ReactNode } from 'react'

export interface WithLayout {
  getLayout: (page: ReactElement, pageProps?: {}) => ReactNode
}

export type Page<P = {}> = NextPage<P> & {
  getLayout?: WithLayout
}
