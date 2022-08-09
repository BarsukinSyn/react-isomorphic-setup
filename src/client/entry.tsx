import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import { App } from './app'
import { createStore } from './store'

const initialStateSource = document.querySelector<HTMLElement>('#initial-state')
const initialStateString = initialStateSource?.dataset.stateString
const initialStateObject = JSON.parse(initialStateString ?? '{}')

const container = document.querySelector('#root')
const store = createStore(initialStateObject)

const app = container && (
  <React.StrictMode>
    <BrowserRouter>
      <App store={store} />
    </BrowserRouter>
  </React.StrictMode>
)

container && ReactDOM.hydrateRoot(container, app)
