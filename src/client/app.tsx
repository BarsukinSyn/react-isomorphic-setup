import React, { FC } from 'react'
import { Provider } from 'react-redux'
import { Routes, Route } from 'react-router-dom'

import { createStore, State } from './store'
import { Catalog } from './catalog'

import './styles.scss'

export type InitialState = Partial<State>

export interface AppProps {
  initialState?: InitialState
}

export const App: FC<AppProps> = ({ initialState }) => (
  <Provider store={createStore(initialState)}>
    <Routes>
      <Route index element={<Catalog />} />
    </Routes>
  </Provider>
)
