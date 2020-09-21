const pkg = require('./package.json')
const opzer = require('./lib/optimize')
const cmd = {
  name: 'other',
  version: package.version,
  path: __dirname,
  optimize: opzer,
  initPackage: {
    default: [],
    yy: []
  }
}