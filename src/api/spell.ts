interface Spell {
  index: string
  name: string
}

interface List<T> {
  count: number
  results: T[]
}

export const spellAPI = {
  fetchAll: () => fetchSpellAPI<List<Spell>>()
}

async function fetchSpellAPI<T>(path: string = ''): Promise<T> {
  const baseURL = 'https://www.dnd5eapi.co/api/spells'
  const response = await fetch(`${baseURL}/${path}`)
  const readedBody = new Response(response.body)
  const result = readedBody.json()

  return result
}
