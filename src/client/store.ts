import { configureStore } from '@reduxjs/toolkit'

import { catalogSlice } from './catalog'

export const createStore = (preloadedState: any) =>
  configureStore({
    preloadedState,
    reducer: {
      catalog: catalogSlice.reducer
    }
  })

type Store = ReturnType<typeof createStore>

export type State = ReturnType<Store['getState']>

export type Dispatch = Store['dispatch']
