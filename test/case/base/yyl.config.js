const config = {
  workflow: 'other',
  localserver:  {
    root: './',
    port: 5000
  },
  proxy: {
    port: 8887,
    localRemote: {
      'http://web.testhost.com/': 'http://127.0.0.1:5000/'
    },
    homePage: 'http://web.testhost.com/'
  }
}

module.exports = config