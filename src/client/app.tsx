import React, { FC } from 'react'
import { Provider } from 'react-redux'

import { Store } from './store'
import { AppRoutes } from './routes'

import './styles.scss'

export interface AppProps {
  store: Store
}

export const App: FC<AppProps> = ({ store }) => (
  <Provider store={store}>
    <AppRoutes />
  </Provider>
)
