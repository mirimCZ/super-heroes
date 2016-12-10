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
        `webpack-hot-middleware/client?path=http://localhost:${constants.HOT_RELOAD_PORT}/__webpack_hmr`,
        path.join(constants.SRC_DIR, 'app/browser/index.js'),
      ] : [
        path.join(constants.SRC_DIR, 'app/browser/index.js'),
      ],
    },
    output: isDevelopment ? {
      path: `${constants.BUILD_DIR_BROWSER}`,
      filename: '[name].js',
      chunkFilename: '[name]-[chunkhash].js',
      publicPath: `http://localhost:${constants.HOT_RELOAD_PORT}/build/`,
    } : {
      path: `${constants.BUILD_DIR_BROWSER}`,
      filename: '[name]-[hash].js',
      chunkFilename: '[name]-[chunkhash].js',
      publicPath: '/assets/',
    },
    plugins: (() => {
      const plugins = [
        new webpack.DefinePlugin({
          'process.env': {
            IS_BROWSER: true,
            NODE_ENV: JSON.stringify(isDevelopment ? 'development' : 'production'),
          },
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
