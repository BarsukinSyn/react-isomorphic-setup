import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { ServerResponse as Response } from 'http'

import { App } from '../client/app'
import { Root, doctype, documentSeparator } from '../client/root'
import { AssetManifestFileMap } from './asset-manifest-mapper'

export class AppRenderer {
  #assetManifestFileMap: AssetManifestFileMap

  constructor(assetManifestFileMap: AssetManifestFileMap) {
    this.#assetManifestFileMap = assetManifestFileMap
  }

  renderToStream(res: Response) {
    const document = this.#renderDocument()
    const [startOfDocument, endOfDocument] = document.split(documentSeparator)
    const app = this.#buildApp()

    const stream = ReactDOMServer.renderToPipeableStream(app, {
      onShellReady() {
        res.write(`${doctype}${startOfDocument}`)
        stream.pipe(res).write(endOfDocument)
      },
      onError(error) {
        console.error(error)
        res.writeHead(500).end('500 Internal Server Error')
      }
    })
  }

  #renderDocument(): string {
    const { favicon, js, css } = this.#assetManifestFileMap
    const document = ReactDOMServer.renderToStaticMarkup(
      <Root faviconPath={favicon} jsFilePaths={js} cssFilePaths={css} />
    )

    return document
  }

  #buildApp = () => <App />
}
