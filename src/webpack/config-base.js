import CopyWebpackPlugin from 'copy-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import WebpackIsomorphicToolsPlugin from 'webpack-isomorphic-tools/plugin'
import assets from './browser/assets'
import autoprefixer from 'autoprefixer'
import constants from '../constants'
import validate from 'webpack-validator'
import webpack from 'webpack'

const loaders = {
  css: '',
  scss: '!sass-loader',
  sass: '!sass-loader?indentedSyntax',
}

const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(assets)

const makeDefaultConfig = (options) => {
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
    module: {
      loaders: [
        {
          loader: 'url-loader?limit=10000',
          test: /\.(gif|jpg|png|svg)(\?.*)?$/,
        }, {
          loader: 'url-loader?limit=1',
          test: /favicon\.ico$/,
        }, {
          loader: 'json-loader',
          test: /\.json$/,
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
            ]
          },
        },
        ...stylesLoaders,
      ],
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
            from: './src/app/assets/',
            to: 'assets',
          }]),
        )
      }
      return plugins
    })(),
    postcss: () => [autoprefixer({ browsers: 'last 2 version' })],
  }

  if (isDevelopment) {
    config.devtool = 'eval'
  }

  return validate(config)
}

export default makeDefaultConfig
