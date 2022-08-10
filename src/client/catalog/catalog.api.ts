interface List<T> {
  count: number
  results: T[]
}

interface Item {
  index: string
  name: string
  [key: string]: string
}

type ItemList = List<Item>

async function fetchAPI<T>(path: string = ''): Promise<T> {
  const baseURL = 'https://www.dnd5eapi.co/api'
  const response = await fetch(`${baseURL}/${path}`)
  const data = response.json()

  return data
}

async function fetchItemList() {
  const data = await fetchAPI<ItemList>('spells')
  const itemList = data.results.map(({ index, name }) => ({ index, name }))

  return itemList
}

export const catalogAPI = {
  fetchItemList
}
