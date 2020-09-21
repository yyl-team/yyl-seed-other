const SeedResponse = require('yyl-seed-response')
const Lang = require('../lib/optimize')
const chalk = require('chalk')
const extOs = require('yyl-os')
const path = require('path')
const fs = require('fs')
const opzer = function ({ config, root, iEnv, ctx }) {
  const iRes = new SeedResponse()
  const r = {
    getConfigSync() {
      return config
    },
    response: iRes,
    root,
    ignoreLiveReload: false,
    on(...args) {
      iRes.on(...args)
      return r
    },
    all() {
      const cmd = `npm run yyl:d`
      const targetPkgPath = path.join(root, 'package.json')
      if (!fs.existsSync(targetPkgPath)) {
        iRes.trigger('msg', ['error', `${pkg.script['']}: ${chalk.yellow(targetPkgPath)}`])
        return iRes
      }
      try {
        const targetPkg = require(targetPkgPath)
        iRes.trigger('start', ['all'])
        iRes.trigger('msg', ['info', `${Lang.WATCH_START}: ${chalk.yellow(cmd)}`])
        if (targetPkg.script && targetPkg.script['yyl:o']) {
          extOs.runCMD(cmd)
          iRes.trigger('finished')
        } else {
          iRes.trigger('msg', ['error', PKG_SCRIPT_WATCH_NOT_EXISTS])
        }
      } catch (er) {
        iRes.trigger('msg', ['error', PKG_PREASE_ERROR, er])
      }
    },
    watch() {
      const cmd = `npm run yyl:d`
      const targetPkgPath = path.join(root, 'package.json')
      if (!fs.existsSync(targetPkgPath)) {
        iRes.trigger('msg', ['error', `${pkg.script['']}: ${chalk.yellow(targetPkgPath)}`])
        return iRes
      }
      try {
        const targetPkg = require(targetPkgPath)
        iRes.trigger('start', ['watch'])
        iRes.trigger('msg', ['info', `${Lang.WATCH_START}: ${chalk.yellow(cmd)}`])
        if (targetPkg.script && targetPkg.script['yyl:d']) {
          extOs.runCMD(cmd)
          iRes.trigger('finished')
        } else {
          iRes.trigger('msg', ['error', PKG_SCRIPT_WATCH_NOT_EXISTS])
        }
      } catch (er) {
        iRes.trigger('msg', ['error', PKG_PREASE_ERROR, er])
      }
      
      // TODO:
      return iRes
    }
  }
  return r
}
opzer.handles = ['watch', 'all']
opzer.withServer = false

module.exports = opzer