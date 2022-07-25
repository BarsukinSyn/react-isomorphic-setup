import fs from 'fs'
import path from 'path'

export interface AssetManifestFileMap {
  favicon: string
  js: string[]
  css: string[]
}

export class AssetManifestMapper {
  #manifest: {
    [key: string]: string
  }

  constructor(filePath: string, encoding: BufferEncoding = 'utf-8') {
    const fileAbsolutePath = path.resolve(__dirname, filePath)
    const manifestData = fs.readFileSync(fileAbsolutePath, encoding)
    const manifestJSON = JSON.parse(manifestData)

    this.#manifest = manifestJSON
  }

  mapByFile(): AssetManifestFileMap {
    const manifestEntries = Object.entries(this.#manifest)
    const manifestFileMap = manifestEntries.reduce<AssetManifestFileMap>(
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
}
