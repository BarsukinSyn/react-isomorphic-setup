import React, { FC, Suspense, lazy } from 'react'
import { Provider } from 'react-redux'
import { Routes, Route } from 'react-router-dom'

import { Layout } from './shared/layout'
import { Store } from './store'

const Catalog = lazy(() => import('./catalog'))

import './styles.scss'

export interface AppProps {
  store: Store
}

export const App: FC<AppProps> = ({ store }) => (
  <Provider store={store}>
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route
          index
          element={
            <Suspense fallback={<p>Flipping through an old book...</p>}>
              <Catalog />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  </Provider>
)
