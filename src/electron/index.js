require('babel-polyfill')

if (process.env.NODE_ENV === 'development') {
  require('electron-debug')() // eslint-disable-line global-require
  const path = require('path') // eslint-disable-line global-require
  const p = path.join(__dirname, '..', 'app', 'node_modules') // eslint-disable-line global-require
  require('module').globalPaths.push(p) // eslint-disable-line global-require
}

require('./main')
