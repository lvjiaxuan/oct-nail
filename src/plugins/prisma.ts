import { PrismaClient } from '@prisma/client'
import fp from 'fastify-plugin'

// Use TypeScript module augmentation to declare the type of server.prisma to be PrismaClient
declare module 'fastify' {
  interface FastifyInstance {
    prisma: typeof prisma,
  }
}

const prisma = new PrismaClient()

export default fp(async (server, options) => {

  await prisma.$connect()

  // Make Prisma Client available through the fastify server instance: server.prisma
  server.decorate('prisma', prisma)

  server.addHook('onClose', async _server => {
    await _server.prisma.$disconnect()
  })
})
