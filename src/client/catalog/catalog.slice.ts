import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { catalogAPI } from './catalog.api'

interface CatalogItem {
  id: string
  text: string
}

interface CatalogState {
  itemList: CatalogItem[]
}

const initialState: CatalogState = {
  itemList: []
}

export const fetchList = createAsyncThunk('catalog/list', catalogAPI.fetchList)

export const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchList.fulfilled, (state, action) => {
      state.itemList.push(...action.payload)
    })
  }
})
