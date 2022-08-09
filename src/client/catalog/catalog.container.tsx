import React, { FC } from 'react'

import { spellAPI } from '../../api/spell'
import { wrapPromise } from '../helpers/wrap-promise'

import { Catalog } from './catalog.component'

const resource = wrapPromise(spellAPI.fetchAll())

export const CatalogContainer: FC = () => {
  const apiResponse = resource.read()
  const dataList = apiResponse.results
  const linkList = dataList.map(({ name, index }) => ({
    id: index,
    text: name
  }))

  return <Catalog itemList={linkList} />
}
