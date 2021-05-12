const path = require('path')
const handler = require('../../bin/handler')

test('base jest', async () => {
  const pjPath = path.join(__dirname, '../case/no-server')
  const yylConfig = await handler.all({
    env: {
      config: path.join(pjPath, 'yyl.config.js')
    }
  })

  expect(yylConfig).not.toEqual(undefined)
})
