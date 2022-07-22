import polka from 'polka'
import dotenv from 'dotenv'

import { AppRenderer } from './services/app-renderer'
import { AssetManifestMapper } from './services/asset-manifest-mapper'
import { serveStatic } from './middlewares/serve-static'

dotenv.config()

const { NODE_ENV = 'production', PORT = 8000 } = process.env
const IN_DEV = NODE_ENV === 'development'

const assets = serveStatic({ clientBuildPath: 'public', dev: IN_DEV })

const assetManifestMapper = new AssetManifestMapper('asset-manifest.json')
const assetManifestFileMap = assetManifestMapper.mapByFile()
const appRenderer = new AppRenderer(assetManifestFileMap)

polka()
  .use(assets)
  .get('/', (_, res) => appRenderer.renderToStream(res))
  .listen(PORT, () => console.info('> Server is listening on port', PORT))
