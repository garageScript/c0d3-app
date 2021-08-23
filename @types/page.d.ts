import { NextPage } from 'next'
import { ReactElement, ReactNode } from 'react'

export type LayoutGetter<LayoutProps = any> = (
  page: ReactElement,
  pageProps: LayoutProps
) => ReactNode
export interface WithLayout {
  getLayout: LayoutGetter
}

export type NextPageWithLayout = NextPage<P> & {
  getLayout?: LayoutGetter
}
