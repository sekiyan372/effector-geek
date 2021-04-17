import { NextPage } from 'next'
import { AppProps } from 'next/app'
import React from 'react'
import Header from '~/components/Header'
import Footer from '~/components/Footer'
import '~/globals.css'

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
  return(
    <>
      <Header />
      <main>
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  )
}

export default App
