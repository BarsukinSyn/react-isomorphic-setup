import React from 'react'
import ReactDOM from 'react-dom/client'

import { App } from './app'

const container = document.querySelector('#root')
const app = container && (
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

container && ReactDOM.hydrateRoot(container, app)
