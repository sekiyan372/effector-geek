import { NextPage } from 'next'
import { AppProps } from 'next/app'
import React from 'react'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { store } from '~/store'
import Header from '~/components/Header'
import Footer from '~/components/Footer'
import '~/globals.css'

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
  const persistor = persistStore(store)

  return(
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Header />
        <main className="md:w-4/5 md:m-auto">
          <Component {...pageProps} />
        </main>
        <Footer />
      </PersistGate>
    </Provider>
  )
}

export default App
