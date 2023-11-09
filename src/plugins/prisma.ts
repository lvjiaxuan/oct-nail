import { PrismaClient } from '@prisma/client'
import { camelCase } from 'lodash-es'
import fp from 'fastify-plugin'

// Use TypeScript module augmentation to declare the type of server.prisma to be PrismaClient
declare module 'fastify' {
  interface FastifyInstance {
    prisma: typeof prisma,
  }
}

type $QueryRawType = PrismaClient['$queryRaw']

const prisma = new PrismaClient().$extends({
  client: {
    // @ts-ignore `Prisma.PrismaPromise<T>`
    async $$queryRaw <T = unknown>(...args: Parameters<$QueryRawType>): Promise<T> {
      // to camelCase
      const result = await prisma.$queryRaw<T>(...args)

      if (Array.isArray(result) && result.length) {
        type ItemT = T extends unknown[] ? T[number] : never

        // collect keys
        const map = new Map<string, string>()
        if (typeof result[0] === 'object') {
          for (const key in result[0]) {
            map.set(key, camelCase(key))
          }
        }

        return result.map((i: ItemT) => {
          const pure = Object.create(null) as ItemT
          map.forEach((value, key) => {
            /* eslint-disable @typescript-eslint/no-unsafe-assignment */
            // @ts-ignore ts shit
            pure[value] = i[key]
            /* eslint-enable @typescript-eslint/no-unsafe-assignment */
          })
          return pure
        }) as T
      }

      return result
    },
  },
})

export default fp(async (server, options) => {

  await prisma.$connect()

  // Make Prisma Client available through the fastify server instance: server.prisma
  server.decorate('prisma', prisma)

  server.addHook('onClose', async _server => {
    await _server.prisma.$disconnect()
  })
})
