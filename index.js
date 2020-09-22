const pkg = require('./package.json')
const opzer = require('./lib/optimize')
const cmd = {
  name: 'other',
  version: pkg.version,
  path: __dirname,
  optimize: opzer,
  initPackage: {
    default: ['init-me-seed-yyl-other'],
    yy: ['init-me-seed-yyl-other']
  }
}
module.exports = cmd
