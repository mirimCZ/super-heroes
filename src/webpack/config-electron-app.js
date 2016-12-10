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
    output: isDevelopment ? {
      path: `${constants.BUILD_DIR_ELECTRON}`,
      filename: '[name].js',
      chunkFilename: '[name]-[chunkhash].js',
      publicPath: `http://localhost:${constants.HOT_RELOAD_PORT_ELECTRON}/build/`,
    } : {
      path: `${constants.BUILD_DIR_ELECTRON}`,
      filename: '[name]-[hash].js',
      chunkFilename: '[name]-[chunkhash].js',
      publicPath: '/assets/',
    },
    plugins: (() => {
      const plugins = [
        new webpack.DefinePlugin({
          'process.env': {
            IS_ELECTRON: true,
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

/*
import constants from './constants'
import path from 'path'

const makeConfig = options => {
  const {
    isDevelopment,
  } = options

  const config = {
    cache: isDevelopment,
    debug: isDevelopment,
    devtool: isDevelopment ? 'eval' : '',
    entry: {
      app: path.join(constants.SRC_DIR, 'electron/index.js'),
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: constants.NODE_MODULES_DIR,
          loader: 'babel',
          query: {
            cacheDirectory: true,
            presets: ['es2015', 'es2017', 'react', 'stage-1'],
            plugins: [
              ['transform-runtime', {
                helpers: false,
                polyfill: false,
                regenerator: false,
              }],
            ],
            env: {
              production: {
                plugins: [
                  'transform-react-constant-elements',
                ],
              },
            },
          },
        },
      ],
    },

    output: {
      path: `${constants.BUILD_DIR}/electron`,
      filename: 'main.js',

      // https://github.com/webpack/webpack/issues/1114
      libraryTarget: 'commonjs2',
    },
    target: 'electron-main',
    node: {
      __dirname: false,
      __filename: false,
    },
  }

  return config
}

*/
