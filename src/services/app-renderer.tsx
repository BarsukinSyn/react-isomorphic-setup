import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { IncomingMessage as Request, ServerResponse as Response } from 'http'

import { App, InitialState } from '../client/app'
import { Root, doctype, documentSeparator } from '../client/root'
import { AssetManifestFileMap } from './asset-manifest-mapper'

export class AppRenderer {
  #assetManifestFileMap: AssetManifestFileMap

  constructor(assetManifestFileMap: AssetManifestFileMap) {
    this.#assetManifestFileMap = assetManifestFileMap
  }

  renderToStream(req: Request, res: Response, initialAppState?: InitialState) {
    const document = this.#renderDocument(initialAppState)
    const [startOfDocument, endOfDocument] = document.split(documentSeparator)
    const app = this.#buildApp(req.url!, initialAppState)

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

  #renderDocument(initialAppState?: InitialState): string {
    const { favicon, js, css } = this.#assetManifestFileMap
    const document = ReactDOMServer.renderToStaticMarkup(
      <Root
        faviconPath={favicon}
        jsFilePaths={js}
        cssFilePaths={css}
        initialAppState={initialAppState}
      />
    )

    return document
  }

  #buildApp = (url: string, initialState?: InitialState) => (
    <StaticRouter location={url}>
      <App initialState={initialState} />
    </StaticRouter>
  )
}
