const dotenv = require('dotenv')
const { resolve } = require('path')
const { exec } = require('child_process')
const { merge } = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

dotenv.config()

const PUBLIC_PATH = process.env.PUBLIC_PATH

const srcPath = resolve(__dirname, 'src')
const buildPath = resolve(__dirname, 'build')
const clientPathMap = {
  entry: resolve(srcPath, 'client', 'entry.tsx'),
  output: resolve(buildPath, 'public')
}
const assetOutputPathMap = {
  manifest: resolve(buildPath, 'asset-manifest.json')
}

const common = {
  mode: 'development',
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  }
}

const devServer = {
  host: '0.0.0.0',
  port: 8080,
  static: false,
  headers: {
    'Access-Control-Allow-Origin': `*`
  },
  devMiddleware: {
    writeToDisk: true
  },
  onListening() {
    exec(`touch ${clientPathMap.entry}`) // hack for delayed launch of nodemon
  }
}

const clientConfig = merge(common, {
  name: 'client',
  target: 'web',
  entry: {
    client: clientPathMap.entry
  },
  output: {
    path: clientPathMap.output,
    filename: '[name].js'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new ReactRefreshPlugin({
      overlay: {
        sockHost: `${devServer.host}:${devServer.port}`
      }
    }),
    new WebpackManifestPlugin({
      fileName: assetOutputPathMap.manifest,
      publicPath: PUBLIC_PATH,
      filter: (file) => !file.isChunk || file.isInitial
    })
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          configFile: 'tsconfig.json'
        }
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'initial',
          name: 'vendor',
          enforce: true
        }
      }
    }
  },
  devServer
})

const serverConfig = merge(common, {
  name: 'server',
  target: 'node',
  entry: {
    server: resolve(srcPath, 'server.ts')
  },
  output: {
    path: buildPath,
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          configFile: 'tsconfig.json',
          compilerOptions: {
            module: 'CommonJS'
          }
        }
      }
    ]
  },
  externals: [nodeExternals()]
})

module.exports = [clientConfig, serverConfig]
