import { FastifyPluginAsync } from 'fastify'

const Users: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/getUsersPage', async function (request, reply) {
    // fastify.prisma.$queryRaw
    return 'this is an example'
  })
}

export default Users
