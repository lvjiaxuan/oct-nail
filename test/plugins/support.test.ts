import Fastify from 'fastify'
import Support from '../../src/plugins/support.js'

test('support works standalone', async () => {
  const fastify = Fastify()
  void fastify.register(Support)
  await fastify.ready()

})
