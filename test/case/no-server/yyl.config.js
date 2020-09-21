const config = {
  workflow: 'other',
  proxy: {
    port: 8887,
    localRemote: {
      'http://web.yy.com/': 'http://www.yy.com/'
    },
    homePage: 'http://web.yy.com/'
  }
}

module.exports = config