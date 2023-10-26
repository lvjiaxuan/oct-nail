import * as defaults from '~/defaults.js'
import type { FastifyPluginAsync } from 'fastify'

const registerAdmin: FastifyPluginAsync = async fastify => {

  fastify.get<{
    Querystring: QueryPagination & ParseSchemaQuery<typeof fastify.prisma.user.fields>
  }>('/getUserListPage', async function (request, reply) {
    const queryParams = defaults.queryPaginationDefaults

    const sqlData = await Promise.all([
      fastify.prisma.$queryRaw<unknown[]>`select * FROM user LIMIT ${ queryParams.size }, ${ (queryParams.page - 1) * queryParams.size }`,
      fastify.prisma.$queryRaw<{ total: number }>`select COUNT(*) AS total FROM user`,
    ])

    return {
      list: sqlData[0],
      total: sqlData[1].total,
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
