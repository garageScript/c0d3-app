import React from 'react'
import AppNav from './AppNav'
import Footer from './Footer'
import Head from 'next/head'
import type { LayoutGetter } from '../@types/page'
import styles from '../scss/layout.module.scss'

const Layout: React.FC<{ title?: string; bg?: 'white' | 'light-gray' }> = ({
  children,
  title,
  bg
}) => (
  <main className={styles[bg === 'white' ? 'white' : 'light-gray']}>
    <Head>
      <title key="title">{title ? `${title} — C0D3` : 'C0D3'}</title>
    </Head>
    <AppNav />
    <div className={`container-md ${styles.container}`}>{children}</div>
    <Footer />
  </main>
)

export const getLayout: LayoutGetter = page => <Layout>{page}</Layout>
export default Layout
