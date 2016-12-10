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

export default makeConfig
