import React, { FC, Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'

import { Layout } from './shared/layout'

const Catalog = lazy(() => import('./catalog'))
const SuspendedCatalog = () => (
  <Suspense fallback={<p>Flipping through an old book...</p>}>
    <Catalog />
  </Suspense>
)

export const AppRoutes: FC = () => (
  <Routes>
    <Route path='/' element={<Layout />}>
      <Route index element={<SuspendedCatalog />} />
    </Route>
  </Routes>
)
