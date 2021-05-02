import { NextPage } from 'next'
import { AppProps } from 'next/app'
import React from 'react'
import { Provider } from 'react-redux'
import { store } from '~/store'
import Header from '~/components/Header'
import Footer from '~/components/Footer'
import '~/globals.css'

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
  return(
    <Provider store={store}>
      <Header />
      <main>
        <Component {...pageProps} />
      </main>
      <Footer />
    </Provider>
  )
}

export default App
