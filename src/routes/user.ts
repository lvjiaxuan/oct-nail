import * as defaults from '~/defaults.js'
import { type FastifyPluginAsync } from 'fastify'

type UserFields = Fastify['prisma']['user']['fields']

const registerAdmin: FastifyPluginAsync = async fastify => {

  fastify.get<{
    Querystring: QueryPagination<UserFields>,
    Reply: ReturnPagination<UserFields>
  }>('/getUserListPage', async function (request, reply) {
    const body = { ...defaults.queryPaginationDefaults, ...request.query }


    const sqlData = await Promise.all([
      fastify.prisma.$$queryRaw<UserFields[]>`select * FROM user LIMIT ${ body.pagination.size } OFFSET ${ (body.pagination.page - 1) * body.pagination.size }`,
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
