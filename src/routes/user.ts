import * as defaults from '~/defaults.js'
import { type FastifyPluginAsync } from 'fastify'
import { Prisma } from '@prisma/client'

type UserFields = Fastify['prisma']['user']['fields']

export default (async (fastify, opts) => {

  const prismaUser = fastify.prisma.user

  fastify.post<{
    Body: Prisma.UserCreateInput
  }>('/addUser', async (request, reply) => {
    await prismaUser.create({ data: request.body })
  })

  fastify.post<{
    Body: Prisma.UserUncheckedUpdateInput
  }>('/updateUserById', async (request, reply) => {

    await prismaUser.update({
      where: { id: +request.body.id! },
      data: request.body,
    })
  })

  fastify.get<{
    Querystring: { id: string },
  }>('/findUserById', (request, reply) =>
    prismaUser.findUniqueOrThrow({ where: { id: +request.query.id } }),
  )

  fastify.get<{
    Querystring: QueryPagination<UserFields>,
    Reply: ReturnPagination<UserFields>
  }>('/getUserListPage', async (request, reply) => {
    const body = { ...defaults.queryPaginationDefaults, ...request.query }

    const sqlData = await Promise.all([
      fastify.prisma.$queryRaw<UserFields[]>`select * FROM user LIMIT ${ body.pagination.size } OFFSET ${ (body.pagination.page - 1) * body.pagination.size }`,
      prismaUser.count(),
    ])

    return {
      list: sqlData[0],
      total: sqlData[1],
    }
  })
}) as FastifyPluginAsync
