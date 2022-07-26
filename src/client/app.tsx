import React, { FC } from 'react'
import { Routes, Route } from 'react-router-dom'

import { Catalog } from './catalog'

import './styles.scss'

export const App: FC = () => (
  <Routes>
    <Route index element={<Catalog />} />
  </Routes>
)
