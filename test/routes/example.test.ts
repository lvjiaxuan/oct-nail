import { build } from '../helper.js'

test('example is loaded', async () => {
  const app = await build()

  const res = await app.inject({ url: '/example' })

})
