import * as React from 'react'
import { AppProps } from 'next/app'
import '../styles/tailwind.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <Component {...pageProps} />
      <style jsx global>
        {`
          @import url('https://fonts.googleapis.com/css?family=Nunito+Sans&display=swap');
          @import url('https://fonts.googleapis.com/css?family=PT+Mono&display=swap');

          html,
          body {
            margin: 0;
            padding: 0;
            font-size: 62.5%;
            font-family: 'Nunito Sans', sans-serif;
          }
          * {
            box-sizing: border-box;
          }
        `}
      </style>
    </React.Fragment>
  )
}

export default MyApp
