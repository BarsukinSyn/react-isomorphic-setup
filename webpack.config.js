const { resolve } = require('path')
const nodeExternals = require('webpack-node-externals')

const srcPath = resolve(__dirname, 'src')
const buildPath = resolve(__dirname, 'build')

const serverConfig = {
  name: 'server',
  target: 'node',
  mode: 'development',
  entry: {
    server: resolve(srcPath, 'server.ts')
  },
  output: {
    path: buildPath,
    filename: 'index.js'
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  },
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
  externals: [nodeExternals()]
}

module.exports = [serverConfig]
