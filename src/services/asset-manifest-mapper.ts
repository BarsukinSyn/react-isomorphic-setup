import fs from 'fs'
import path from 'path'

export interface AssetManifestMap {
  favicon: string
  js: string[]
  css: string[]
}

export class AssetManifestMapper {
  #manifest: Record<string, string>

  constructor(filePath: string, encoding: BufferEncoding = 'utf-8') {
    this.#manifest = this.#read(filePath, encoding)
  }

  map(): AssetManifestMap {
    const manifestEntries = Object.entries(this.#manifest)
    const manifestFileMap = manifestEntries.reduce<AssetManifestMap>(
      (map, [fileName, src]) => {
        if (fileName.includes('favicon.ico')) map.favicon = src
        if (fileName.endsWith('.js')) map.js = map.js.concat(src)
        if (fileName.endsWith('.css')) map.css = map.css.concat(src)

        return map
      },
      { favicon: '', js: [], css: [] }
    )

    return manifestFileMap
  }

  #read(filePath: string, encoding: BufferEncoding): Record<string, string> {
    const fileAbsolutePath = path.resolve(__dirname, filePath)
    const manifestData = fs.readFileSync(fileAbsolutePath, encoding)
    const manifestJSON = JSON.parse(manifestData)

    return manifestJSON
  }
}
