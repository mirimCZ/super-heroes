import constants from '../constants'
import makeBaseConfig from './config-base'
import merge from 'webpack-merge'
import path from 'path'
import validate from 'webpack-validator'

const makeElectronConfig = options => {
  const config = {
    entry: {
      app: path.join(constants.SRC_DIR, 'electron/index.js'),
    },
    plugins: [
    ],
    output: {
      path: `${constants.BUILD_DIR_ELECTRON}`,
      filename: 'main.js',
      libraryTarget: 'commonjs2',
    },
    target: 'electron-main',
    node: {
      __dirname: false,
      __filename: false,
    },
  }

  return validate(merge(makeBaseConfig(options), config))
}

export default makeElectronConfig
