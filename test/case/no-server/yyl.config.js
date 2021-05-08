const config = {
  workflow: 'other',
  proxy: {
    port: 8887,
    localRemote: {
      'http://web.testhost.com/': 'http://www.testhost.com/'
    },
    homePage: 'http://web.testhost.com/'
  }
}

module.exports = config