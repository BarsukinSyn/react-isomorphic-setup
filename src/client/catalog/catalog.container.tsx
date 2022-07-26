import React, { FC } from 'react'

import { useSelector } from '../hooks/useStore'

import { Catalog } from './catalog.component'

export const CatalogContainer: FC = () => {
  const personalizedSubtitle = useSelector(
    (state) => state.catalog.personalizedSubtitle
  )

  return <Catalog subtitle={personalizedSubtitle} />
}
