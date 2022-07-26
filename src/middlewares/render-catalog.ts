import { Middleware } from 'polka'

import { AppRenderer } from '../services/app-renderer'

export function renderCatalog(appRenderer: AppRenderer): Middleware {
  return function middleware(req, res) {
    const personalizedSubtitle = 'We have spells if you have coin'
    const initialAppState = { catalog: { personalizedSubtitle } }

    appRenderer.render(req, res, initialAppState)
  }
}
