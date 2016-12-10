import path from 'path'

const ABSOLUTE_BASE = path.normalize(path.join(__dirname, '..'))

const local = {
  target: {
    browser: 'target/browser',
    electron: 'target/electron',
  },
}

const constants = Object.freeze({
  ABSOLUTE_BASE,
  BUILD_DIR_BROWSER: path.join(ABSOLUTE_BASE, local.target.browser),
  BUILD_DIR_ELECTRON: path.join(ABSOLUTE_BASE, local.target.electron),
  HOT_RELOAD_PORT: process.env.HOT_RELOAD_PORT || 8080,
  HOT_RELOAD_PORT_ELECTRON: process.env.HOT_RELOAD_PORT_ELECTRON || 8081,
  NODE_MODULES_DIR: path.join(ABSOLUTE_BASE, 'node_modules'),
  SRC_DIR: path.join(ABSOLUTE_BASE, 'src'),
  TARGET: local.target,
})

export default constants
