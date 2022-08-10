import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { catalogAPI } from './catalog.api'

interface CatalogItem {
  index: string
  name: string
}

interface CatalogState {
  itemList?: CatalogItem[]
}

const initialState: CatalogState = {}

export const fetchItemList = createAsyncThunk(
  'catalog/itemList',
  catalogAPI.fetchItemList
)

export const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchItemList.fulfilled, (state, action) => {
      state.itemList = action.payload
    })
  }
})
