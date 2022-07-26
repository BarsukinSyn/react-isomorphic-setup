import React, { FC } from 'react'

import { spellAPI } from '../../../api/spell'
import { wrapPromise } from '../../helpers/wrap-promise'

import { List } from './list.component'

const resource = wrapPromise(spellAPI.fetchAll())

export const ListContainer: FC = () => {
  const apiResponse = resource.read()
  const dataList = apiResponse.results
  const linkList = dataList.map(({ name, index }) => ({ name, path: index }))

  return <List linkList={linkList} />
}
