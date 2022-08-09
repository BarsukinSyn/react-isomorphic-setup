import React from 'react'
import { Writable } from 'stream'
import { StaticRouter } from 'react-router-dom/server'
import { IncomingMessage as Request, ServerResponse as Response } from 'http'
import { renderToPipeableStream, renderToStaticMarkup } from 'react-dom/server'

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

    const documentStream = new Writable({
      write(...args) {
        res.write(...args)
      },
      final() {
        res.end(`${endOfDocument}`)
      }
    })

    const appStream = renderToPipeableStream(app, {
      onShellReady() {
        res.write(`${doctype}${startOfDocument}`)
        appStream.pipe(documentStream)
      },
      onError(error) {
        console.error(error)
      }
    })
  }

  #renderDocument(initialAppState?: InitialState): string {
    const { favicon, js, css } = this.#assetManifestMap
    const document = renderToStaticMarkup(
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
