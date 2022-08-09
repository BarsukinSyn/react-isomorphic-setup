interface List<T> {
  count: number
  results: T[]
}

interface Spell {
  index: string
  name: string
}

export type SpellList = List<Spell>

export const dndAPI = {
  fetchSpellList: () => fetchAPI<SpellList>('spells')
}

async function fetchAPI<T>(path: string = ''): Promise<T> {
  const baseURL = 'https://www.dnd5eapi.co/api'
  const response = await fetch(`${baseURL}/${path}`)
  const body = new Response(response.body)
  const result = body.json()

  return result
}
