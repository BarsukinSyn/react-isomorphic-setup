import { Middleware } from 'polka'

import { AppRenderer } from '../services/app-renderer'

export function renderCatalog(appRenderer: AppRenderer): Middleware {
  return function middleware(_, res) {
    appRenderer.renderToStream(res)
  }
}
