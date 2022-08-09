import { dndAPI } from '../../api/dnd5'

const fetchList = () =>
  dndAPI
    .fetchSpellList()
    .then((response) => response.results)
    .then((results) =>
      results.map(({ index, name }) => ({ id: index, text: name }))
    )

export const catalogAPI = {
  fetchList
}
