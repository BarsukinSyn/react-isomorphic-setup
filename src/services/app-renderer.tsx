import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { IncomingMessage as Request, ServerResponse as Response } from 'http'

import { App, InitialState } from '../client/app'
import { Document, doctype, documentSeparator } from '../client/document'
import { AssetManifestMap, AssetManifestMapper } from './asset-manifest-mapper'

export class AppRenderer {
  #assetManifestMap: AssetManifestMap

  constructor(assetManifestMapper: AssetManifestMapper) {
    this.#assetManifestMap = assetManifestMapper.map()
  }

  render(req: Request, res: Response, initialAppState?: InitialState) {
    const app = this.#buildApp(req.url!, initialAppState)
    const document = this.#renderDocument(initialAppState)
    const [startOfDocument, endOfDocument] = document.split(documentSeparator)

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
    const { favicon, js, css } = this.#assetManifestMap
    const document = ReactDOMServer.renderToStaticMarkup(
      <Document
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
