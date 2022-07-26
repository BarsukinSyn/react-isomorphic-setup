import { createSlice } from '@reduxjs/toolkit'

interface CatalogState {
  personalizedSubtitle: string
}

const initialState: CatalogState = {
  personalizedSubtitle: 'We have something special for you'
}

export const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {}
})
