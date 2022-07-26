import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import { App } from './app'

const container = document.querySelector('#root')
const app = container && (
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)

container && ReactDOM.hydrateRoot(container, app)
