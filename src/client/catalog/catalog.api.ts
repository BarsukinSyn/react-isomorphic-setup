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
  const body = new Response(response.body)
  const result = body.json()

  return result
}

async function fetchList() {
  const response = await fetchAPI<ItemList>('spells')
  const itemList = response.results.map(({ index, name }) => ({
    id: index,
    text: name
  }))

  return itemList
}

export const catalogAPI = {
  fetchList
}
