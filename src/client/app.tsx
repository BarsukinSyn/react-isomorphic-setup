import React, { FC } from 'react'
import { Provider } from 'react-redux'
import { Routes, Route } from 'react-router-dom'

import { Catalog } from './catalog'
import { Store } from './store'

import './styles.scss'

export interface AppProps {
  store: Store
}

export const App: FC<AppProps> = ({ store }) => (
  <Provider store={store}>
    <Routes>
      <Route index element={<Catalog />} />
    </Routes>
  </Provider>
)
