import React from 'react'
import Head from 'next/head'

const Title: React.FC<{ title?: string }> = ({ title }) => (
  <Head>
    <title>{title ? `${title} ? C0D3` : 'C0D3'}</title>
  </Head>
)

export default Title
