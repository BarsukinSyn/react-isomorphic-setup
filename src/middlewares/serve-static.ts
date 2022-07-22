import path from 'path'
import sirv from 'sirv'
import { Middleware } from 'polka'

export interface ServeOptions {
  clientBuildPath: string
  dev?: boolean
}

export function serveStatic(opts: ServeOptions): Middleware {
  const { clientBuildPath, dev } = opts
  const clientBuildAbsolutePath = path.resolve(__dirname, clientBuildPath)
  const middleware = sirv(clientBuildAbsolutePath, { dev })

  return middleware
}
