import camelCase from 'lodash/camelCase'
import fp from 'fastify-plugin'
import { PrismaClient } from '@prisma/client'

// Use TypeScript module augmentation to declare the type of server.prisma to be PrismaClient
declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient
  }
}

export default fp(async (server, options) => {
  const prisma = new PrismaClient()

  type $queryRawType = typeof prisma.$queryRaw
  prisma.$extends({
    name: 'camelCase',
    client: {
      // @ts-ignore promise
      async $$queryRaw <T = unknown>(...args: Parameters<$queryRawType>): ReturnType<$queryRawType> {
        // to camelCase
        const result = prisma.$queryRaw<T>(...args)

        if (Array.isArray(result) && result.length) {
          const map = new Map<string, string>()
          if (typeof result[0] === 'object') {
            for (const key of result[0]) {
              map.set(key as string, camelCase(key as string))
            }
          }
        }

        return result
      },
    },
  })


  await prisma.$connect()

  // Make Prisma Client available through the fastify server instance: server.prisma
  server.decorate('prisma', prisma)

  server.addHook('onClose', async _server => {
    await _server.prisma.$disconnect()
  })
})
