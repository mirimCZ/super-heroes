/* @flow weak */
// TODO: refactor - this is breaking naming standard
import gutil from 'gulp-util'
import makeBrowserConfig from './config-browser'
import makeElectronAppConfig from './config-electron-app'
import makeElectronConfig from './makeElectronConfig'
import webpack from 'webpack'

const build = (type, done) => {
  let config
  const options = { isDevelopment: false }

  switch (type) {
    case 'browser': {
      config = makeBrowserConfig(options)
      break
    }

    case 'electron-app': {
      config = makeElectronAppConfig(options)
      break
    }

    case 'electron': {
      config = makeElectronConfig(options)
      break
    }

    default: {
      throw new gutil.PluginError('webpack', {
        message: `Unknown build type: "${type}"`,
      })
    }
  }

  webpack(config, (fatalError, stats) => {
    const jsonStats = stats.toJson()
    const buildError = fatalError || jsonStats.errors[0] || jsonStats.warnings[0]

    if (buildError) {
      throw new gutil.PluginError('webpack', buildError)
    }

    gutil.log('[webpack]', stats.toString({
      colors: true,
      version: false,
      hash: false,
      timings: false,
      chunks: false,
      chunkModules: false,
    }))

    done()
  })
}

export default build
