import * as defaults from '~/defaults.js'
import type { FastifyPlugin } from 'fastify'

const Users: FastifyPlugin = async (fastify, opts): Promise<void> => {
  fastify.get<{
    Querystring: QueryPagination
  }>('/getUsersPage', async function (request, reply) {
    const queryParams = defaults.queryPaginationDefaults

    await fastify.prisma.$queryRaw`select * FROM user LIMIT ${ queryParams.size }, ${ (queryParams.page - 1) * queryParams.size }`
    return 'this is an example'
  })
}

export default Users
