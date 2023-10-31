import * as defaults from '~/defaults.js'
import type { FastifyPluginAsync } from 'fastify'

const registerAdmin: FastifyPluginAsync = async fastify => {

  fastify.get<{
    Querystring: QueryPagination & ParseSchemaQuery<typeof fastify.prisma.user.fields>
  }>('/getUserListPage', async function (request, reply) {
    const body = { ...request.query, ...defaults.queryPaginationDefaults }

    const sqlData = await Promise.all([
      fastify.prisma.$$queryRaw<unknown[]>`select * FROM user LIMIT ${ body.size } OFFSET ${ (body.page - 1) * body.size }`,
      fastify.prisma.user.count(),
    ])

    return {
      list: sqlData[0],
      total: sqlData[1],
    }
  })

}

const registerApp: FastifyPluginAsync = async fastify => {
  // ...
}

export default (async (fastify, opts) => {
  void fastify.register(registerAdmin, { prefix: '/admin' })
  void fastify.register(registerApp, { prefix: '/app' })
}) as FastifyPluginAsync
