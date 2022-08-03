const dotenv = require('dotenv')
const { resolve } = require('path')
const { merge } = require('webpack-merge')
const CopyPlugin = require('copy-webpack-plugin')
const nodeExternals = require('webpack-node-externals')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')

dotenv.config()

const { NODE_ENV, PUBLIC_PATH } = process.env
const IN_PROD = NODE_ENV === 'production'
const IN_DEV = NODE_ENV === 'development'

const outputChunkNameSubstitution = IN_DEV ? '[name]' : '[contenthash]'

const srcPath = resolve(__dirname, 'src')
const buildPath = resolve(__dirname, 'build')
const staticPath = resolve(__dirname, 'public')

const clientPathMap = {
  entry: resolve(srcPath, 'client', 'entry.tsx'),
  output: resolve(buildPath, 'public')
}

const assetOutputPathMap = {
  fonts: 'fonts/[base]',
  images: 'images/[contenthash][ext]',
  styles: `styles/${outputChunkNameSubstitution}.css`,
  manifest: resolve(buildPath, 'asset-manifest.json')
}

const commonBaseConfig = {
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        type: 'asset/inline'
      }
    ]
  }
}

const clientBaseConfig = merge(commonBaseConfig, {
  name: 'client',
  target: 'web',
  entry: {
    client: clientPathMap.entry
  },
  output: {
    path: clientPathMap.output,
    filename: `${outputChunkNameSubstitution}.js`,
    publicPath: PUBLIC_PATH
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        { from: resolve(staticPath, 'root'), to: clientPathMap.output }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: assetOutputPathMap.styles
    }),
    new WebpackManifestPlugin({
      fileName: assetOutputPathMap.manifest,
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
      },
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          {
            loader: 'resolve-url-loader',
            options: {
              root: staticPath
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true // required for loaders preceding url resolver
            }
          }
        ]
      },
      {
        test: /\.(gif|png|jpe?g)$/,
        type: 'asset/resource',
        generator: {
          filename: assetOutputPathMap.images
        }
      },
      {
        test: /\.(ttf|otf|woff2?)$/,
        type: 'asset/resource',
        generator: {
          filename: assetOutputPathMap.fonts
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
  }
})

const serverBaseConfig = merge(commonBaseConfig, {
  name: 'server',
  target: 'node',
  entry: {
    server: resolve(srcPath, 'server.ts')
  },
  output: {
    path: buildPath,
    filename: 'index.js',
    publicPath: PUBLIC_PATH
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
      },
      {
        test: /\.s?css$/,
        use: [
          {
            loader: 'css-loader',
            options: {
              modules: {
                exportOnlyLocals: true
              }
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.(gif|png|jpe?g)$/,
        type: 'asset/resource',
        generator: {
          filename: assetOutputPathMap.images,
          emit: false
        }
      }
    ]
  },
  externals: [nodeExternals()]
})

if (IN_PROD) {
  const CompressionPlugin = require('compression-webpack-plugin')

  const commonProdConfig = {
    mode: 'production',
    devtool: 'source-map'
  }

  const clientProdConfig = merge(clientBaseConfig, commonProdConfig, {
    plugins: [
      new CompressionPlugin({
        test: /\.(js|css)?$/
      })
    ]
  })

  const serverProdConfig = merge(serverBaseConfig, commonProdConfig)

  module.exports = [clientProdConfig, serverProdConfig]

  return
}

if (IN_DEV) {
  const os = require('os')
  const NodemonPlugin = require('nodemon-webpack-plugin')
  const { WebpackOpenBrowser } = require('webpack-open-browser')
  const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

  const networkInterfaceMap = os.networkInterfaces()
  const networkInterfaceList = Object.values(networkInterfaceMap).flat()
  const localAreaNetworkInterface = networkInterfaceList.find(
    (interface) =>
      !interface.internal &&
      interface.family === 'IPv4' &&
      interface.address !== '127.0.0.1'
  )
  const lanIPAddress = localAreaNetworkInterface?.address ?? 'localhost'

  const webpackDevServerConfig = {
    port: 8080,
    static: false,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    devMiddleware: {
      writeToDisk: true
    }
  }

  const publicPath = `http://${lanIPAddress}:${webpackDevServerConfig.port}/`

  const commonDevConfig = {
    mode: 'development',
    output: { publicPath },
    devtool: 'inline-source-map'
  }

  const clientDevConfig = merge(clientBaseConfig, commonDevConfig, {
    devServer: webpackDevServerConfig,
    plugins: [
      new ReactRefreshPlugin({
        overlay: {
          sockHost: `http://${lanIPAddress}:${webpackDevServerConfig.port}`
        }
      })
    ]
  })

  const PORT = process.env.PORT ?? 8000

  const serverDevConfig = merge(serverBaseConfig, commonDevConfig, {
    plugins: [
      new NodemonPlugin(),
      new WebpackOpenBrowser({
        url: `http://localhost:${PORT}`
      })
    ]
  })

  module.exports = [clientDevConfig, serverDevConfig]

  return
}
