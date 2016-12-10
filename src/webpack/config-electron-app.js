import HtmlWebpackPlugin from 'html-webpack-plugin'
import constants from '../constants'
import makeBaseConfig from './config-base'
import merge from 'webpack-merge'
import path from 'path'
import validate from 'webpack-validator'
import webpack from 'webpack'

const makeBrowserConfig = (options) => {
  const {
    isDevelopment,
  } = options

  const config = {
    entry: {
      app: isDevelopment ? [
        `webpack-hot-middleware/client?path=http://localhost:${constants.HOT_RELOAD_PORT_ELECTRON}/__webpack_hmr`,
        path.join(constants.SRC_DIR, 'app/electron/index.js'),
      ] : [
        path.join(constants.SRC_DIR, 'app/electron/index.js'),
      ],
    },
    target: 'electron-main',
    output: isDevelopment ? {
      path: `${constants.BUILD_DIR_ELECTRON}`,
      filename: '[name].js',
      chunkFilename: '[name]-[chunkhash].js',
      publicPath: `http://localhost:${constants.HOT_RELOAD_PORT_ELECTRON}/build/`,
    } : {
      path: `${constants.BUILD_DIR_ELECTRON}`,
      filename: '[name]-[hash].js',
      chunkFilename: '[name]-[chunkhash].js',
      publicPath: '',
    },
    plugins: (() => {
      const plugins = [
        new webpack.DefinePlugin({
          'process.env': {
            IS_ELECTRON: true,
            NODE_ENV: JSON.stringify(isDevelopment ? 'development' : 'production'),
          },
        }),
        new HtmlWebpackPlugin({
          title: 'Melior Electron',
          filename: 'index.html',
          path: path.join(constants.BUILD_DIR_ELECTRON),
          template: path.join(constants.SRC_DIR, 'electron/index.html'),
        }),
      ]
      return plugins
    })(),
    resolve: {
      extensions: ['', '.js'],
      modulesDirectories: ['src', 'node_modules'],
      root: constants.ABSOLUTE_BASE,
      alias: {
        react$: require.resolve(path.join(constants.NODE_MODULES_DIR, 'react')),
      },
    },
  }

  return validate(merge(makeBaseConfig(options), config))
}

export default makeBrowserConfig
