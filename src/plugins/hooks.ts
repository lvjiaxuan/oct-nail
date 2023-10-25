import fp from 'fastify-plugin'

export default fp(async fastify => {

  // fastify.addHook('preSerialization', (request, reply, payload, done) => {
  //   const newPayload = { wrapped: 1n }
  //   done(null, newPayload)
  // })
})
