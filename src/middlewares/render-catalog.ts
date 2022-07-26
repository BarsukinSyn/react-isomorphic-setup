import { Middleware } from 'polka'

import { AppRenderer } from '../services/app-renderer'

export function renderCatalog(appRenderer: AppRenderer): Middleware {
  return function middleware(req, res) {
    appRenderer.renderToStream(req, res)
  }
}
