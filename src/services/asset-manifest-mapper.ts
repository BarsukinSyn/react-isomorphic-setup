import fs from 'fs'
import path from 'path'

export interface AssetManifestFileMap {
  js: string[]
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
        if (fileName.endsWith('.js')) map.js = map.js.concat(src)

        return map
      },
      { js: [] }
    )

    return manifestFileMap
  }
}
