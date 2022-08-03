import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import { App } from './app'

const initialStateSource = document.querySelector<HTMLElement>('#initial-state')
const initialStateString = initialStateSource?.dataset.stateString
const initialStateObject = JSON.parse(initialStateString ?? '{}')

const container = document.querySelector('#root')

const app = container && (
  <React.StrictMode>
    <BrowserRouter>
      <App initialState={initialStateObject} />
    </BrowserRouter>
  </React.StrictMode>
)

container && ReactDOM.hydrateRoot(container, app)
