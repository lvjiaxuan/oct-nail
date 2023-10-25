import * as defaults from '~/defaults.js'
import type { FastifyPluginAsync } from 'fastify'

const Users: FastifyPluginAsync = async (fastify, opts): Promise<void> => {

  fastify.get<{
    Querystring: QueryPagination & ParseSchemaQuery<typeof fastify.prisma.user.fields>
  }>('/getUserListPage', async function (request, reply) {
    const queryParams = defaults.queryPaginationDefaults

    const sqlData = await Promise.all([
      fastify.prisma.$queryRaw`select * FROM user LIMIT ${ queryParams.size }, ${ (queryParams.page - 1) * queryParams.size }`,
      fastify.prisma.$queryRaw`select COUNT(*) AS total FROM user`,
    ])

    return { sqlData: 1n }
  })
}

export default Users
