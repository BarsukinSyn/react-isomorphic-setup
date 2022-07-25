const dotenv = require('dotenv')
const { resolve } = require('path')
const { exec } = require('child_process')
const { merge } = require('webpack-merge')
const CopyPlugin = require('copy-webpack-plugin')
const nodeExternals = require('webpack-node-externals')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

dotenv.config()

const PUBLIC_PATH = process.env.PUBLIC_PATH

const srcPath = resolve(__dirname, 'src')
const buildPath = resolve(__dirname, 'build')
const staticPath = resolve(__dirname, 'public')
const clientPathMap = {
  entry: resolve(srcPath, 'client', 'entry.tsx'),
  output: resolve(buildPath, 'public')
}
const assetOutputPathMap = {
  fonts: 'fonts/[name][ext]',
  styles: 'styles/[name].css',
  images: 'images/[name][ext]',
  manifest: resolve(buildPath, 'asset-manifest.json')
}

const common = {
  mode: 'development',
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
          filename: assetOutputPathMap.images,
          publicPath: PUBLIC_PATH
        }
      },
      {
        test: /\.(ttf|otf|woff2?)$/,
        type: 'asset/resource',
        generator: {
          filename: assetOutputPathMap.fonts,
          publicPath: PUBLIC_PATH
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
          publicPath: PUBLIC_PATH,
          emit: false
        }
      }
    ]
  },
  externals: [nodeExternals()]
})

module.exports = [clientConfig, serverConfig]
