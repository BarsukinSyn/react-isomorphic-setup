import polka from 'polka'
import dotenv from 'dotenv'

import { AppRenderer } from './services/app-renderer'
import { AssetManifestMapper } from './services/asset-manifest-mapper'
import { renderCatalog } from './middlewares/render-catalog'
import { serveStatic } from './middlewares/serve-static'

dotenv.config()

const { NODE_ENV, PORT = 8000 } = process.env
const IN_DEV = NODE_ENV === 'development'

const assetManifestMapper = new AssetManifestMapper('asset-manifest.json')
const appRenderer = new AppRenderer(assetManifestMapper)

const assets = serveStatic({ clientBuildPath: 'public', dev: IN_DEV })
const catalog = renderCatalog(appRenderer)

polka()
  .use(assets)
  .get('/', catalog)
  .listen(PORT, () => console.info('> Server is listening on port', PORT))
