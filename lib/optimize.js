const SeedResponse = require('yyl-seed-response')
const Lang = require('../lang/index')
const chalk = require('chalk')
const extOs = require('yyl-os')
const path = require('path')
const fs = require('fs')
const opzer = function ({ config, root }) {
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
    async all() {
      const cmd = 'npm run yyl:d'
      const targetPkgPath = path.join(root, 'package.json')
      if (!fs.existsSync(targetPkgPath)) {
        iRes.trigger('msg', [
          'error',
          [`${Lang.PKG_NOT_EXISTS}: ${chalk.yellow(targetPkgPath)}`]
        ])
        return iRes
      }
      try {
        const targetPkg = require(targetPkgPath)
        iRes.trigger('cleanScreen', [])
        iRes.trigger('progress', ['start'])
        iRes.trigger('msg', [
          'info',
          [`${Lang.WATCH_START}: ${chalk.yellow(cmd)}`]
        ])
        if (targetPkg.scripts && targetPkg.scripts['yyl:o']) {
          await extOs.runSpawn(cmd, root, (msg) => {
            iRes.trigger('msg', ['info', [msg.toString()]])
          })
          iRes.trigger('progress', ['finished', 'success', ['done']])
        } else {
          iRes.trigger('msg', ['error', [Lang.PKG_SCRIPT_WATCH_NOT_EXISTS]])
        }
      } catch (er) {
        iRes.trigger('msg', ['error', [Lang.PKG_PREASE_ERROR, er]])
        iRes.trigger('progress', ['finished'])
      }
    },
    async watch() {
      const cmd = 'npm run yyl:d'
      const targetPkgPath = path.join(root, 'package.json')
      if (!fs.existsSync(targetPkgPath)) {
        iRes.trigger('msg', [
          'error',
          [`${Lang.PKG_NOT_EXISTS}: ${chalk.yellow(targetPkgPath)}`]
        ])
        return iRes
      }
      try {
        const targetPkg = require(targetPkgPath)
        iRes.trigger('cleanScreen', [])
        iRes.trigger('progress', ['start'])
        iRes.trigger('msg', [
          'info',
          [`${Lang.WATCH_START}: ${chalk.yellow(cmd)}`]
        ])
        if (targetPkg.scripts && targetPkg.scripts['yyl:d']) {
          extOs.runSpawn(cmd, root, (msg) => {
            iRes.trigger('msg', ['info', [msg.toString()]])
          })
          iRes.trigger('progress', ['finished', 'success', ['done']])
        } else {
          iRes.trigger('msg', ['error', [Lang.PKG_SCRIPT_WATCH_NOT_EXISTS]])
        }
      } catch (er) {
        iRes.trigger('msg', ['error', [Lang.PKG_PREASE_ERROR, er]])
        iRes.trigger('progress', ['finished'])
      }

      return iRes
    }
  }
  return r
}
opzer.handles = ['watch', 'all']
opzer.withServer = false

module.exports = opzer
