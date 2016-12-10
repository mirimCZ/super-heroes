/* @flow weak */
import '../src/server-isom/config'
import assets from './assets'
import autoprefixer from 'autoprefixer'
import constants from './constants'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import path from 'path'
import webpack from 'webpack'
import WebpackIsomorphicToolsPlugin from 'webpack-isomorphic-tools/plugin'

const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(assets)

const loaders = {
  css: '',
  scss: '!sass-loader',
  sass: '!sass-loader?indentedSyntax',
}

const makeConfig = options => {
  const {
    isDevelopment,
  } = options

  const stylesLoaders = Object.keys(loaders).map((ext) => {
    const prefix = 'css-loader!postcss-loader'
    const extLoaders = prefix + loaders[ext]
    const loader = isDevelopment
      ? `style-loader!${extLoaders}`
      : ExtractTextPlugin.extract('style-loader', extLoaders)
    return {
      loader,
      test: new RegExp(`\\.(${ext})$`),
    }
  })

  const config = {
    cache: isDevelopment,
    debug: isDevelopment,
    devtool: isDevelopment ? 'eval' : '',
    hotPort: constants.HOT_RELOAD_PORT,
    entry: {
      app: isDevelopment ? [
        `webpack-hot-middleware/client?path=http://localhost:${constants.HOT_RELOAD_PORT}/__webpack_hmr`,
        path.join(constants.SRC_DIR, 'browser/index.js'),
      ] : [
        path.join(constants.SRC_DIR, 'browser/index.js'),
      ],
    },
    module: {
      loaders: [
        {
          loader: 'url-loader?limit=10000',
          test: /\.(gif|jpg|png|svg)(\?.*)?$/,
        }, {
          loader: 'url-loader?limit=1',
          test: /favicon\.ico$/,
        }, {
          loader: 'url-loader?limit=100000',
          test: /\.(ttf|eot|woff|woff2)(\?.*)?$/,
        }, {
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
        ...stylesLoaders,
      ],
    },
    output: isDevelopment ? {
      path: constants.BUILD_DIR,
      filename: '[name].js',
      chunkFilename: '[name]-[chunkhash].js',
      publicPath: `http://localhost:${constants.HOT_RELOAD_PORT}/build/`,
    } : {
      path: constants.BUILD_DIR,
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
      if (isDevelopment) {
        plugins.push(
          new webpack.optimize.OccurrenceOrderPlugin(),
          new webpack.HotModuleReplacementPlugin(),
          new webpack.NoErrorsPlugin(),
          webpackIsomorphicToolsPlugin.development(),
        )
      } else {
        plugins.push(
          new ExtractTextPlugin('app-[hash].css', {
            allChunks: true,
          }),
          new webpack.optimize.DedupePlugin(),
          new webpack.optimize.OccurrenceOrderPlugin(),
          new webpack.optimize.UglifyJsPlugin({
            compress: {
              screw_ie8: true, // eslint-disable-line camelcase
              warnings: false,
            },
          }),
          new webpack.SourceMapDevToolPlugin({
            filename: '[file].map',
          }),
          webpackIsomorphicToolsPlugin,
          new CopyWebpackPlugin([{
            from: './src/assets/favicons/',
            to: 'favicons',
          }], {
            ignore: ['original/**'],
          }),
        )
      }
      return plugins
    })(),
    postcss: () => [autoprefixer({ browsers: 'last 2 version' })],
    resolve: {
      extensions: ['', '.js'],
      modulesDirectories: ['src', 'node_modules'],
      root: constants.ABSOLUTE_BASE,
      alias: {
        react$: require.resolve(path.join(constants.NODE_MODULES_DIR, 'react')),
      },
    },
  }

  return config
}

export default makeConfig
