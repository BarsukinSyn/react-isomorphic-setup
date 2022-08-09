import { Writable } from 'stream'
import React, { ReactElement } from 'react'
import { StaticRouter } from 'react-router-dom/server'
import { IncomingMessage as Request, ServerResponse as Response } from 'http'
import { renderToPipeableStream, renderToStaticMarkup } from 'react-dom/server'

import { App } from '../client/app'
import { createStore, Store, State } from '../client/store'
import { Document, doctype, documentSeparator } from '../client/document'
import { AssetManifestMap, AssetManifestMapper } from './asset-manifest-mapper'

export class AppRenderer {
  #assetManifestMap: AssetManifestMap

  constructor(assetManifestMapper: AssetManifestMapper) {
    this.#assetManifestMap = assetManifestMapper.map()
  }

  render(req: Request, res: Response) {
    const store = createStore()
    const document = this.#renderDocument()
    const app = this.#buildApp(req.url!, store)
    const [startOfDocument, endOfDocument] = document.split(documentSeparator)

    const documentStream = new Writable({
      write(...args) {
        res.write(...args)
      },
      final: () => {
        const state = store.getState()
        const stateScriptTag = this.#persistStateInScriptTag(state)

        res.end(`${stateScriptTag}${endOfDocument}`)
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

  #renderDocument(): string {
    const { favicon, js, css } = this.#assetManifestMap
    const document = renderToStaticMarkup(
      <Document faviconPath={favicon} jsFilePaths={js} cssFilePaths={css} />
    )

    return document
  }

  #buildApp(location: string, store: Store): ReactElement {
    return (
      <StaticRouter location={location}>
        <App store={store} />
      </StaticRouter>
    )
  }

  #persistStateInScriptTag(state: State): string {
    const stateString = JSON.stringify(state)
    const stateScriptTag = renderToStaticMarkup(
      <script id='initial-state' data-state-string={stateString} />
    )

    return stateScriptTag
  }
}
