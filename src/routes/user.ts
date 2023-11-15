import * as defaults from '~/defaults.js'
import { type FastifyPluginAsync } from 'fastify'
import { Prisma } from '@prisma/client'

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
    Querystring: Pick<Prisma.UserFieldRefs, 'id'>,
  }>('/findUserById', (request, reply) =>
    prismaUser.findUniqueOrThrow({ where: { id: +request.query.id } }),
  )

  fastify.get<{
    Querystring: QueryPagination<Prisma.UserSelect>,
  }>('/getUserListPage', async (request, reply) => {
    const body = { ...defaults.queryPaginationDefaults, ...request.query }

    const sqlData = await Promise.all([
      prismaUser.findMany({
        skip: body.pagination.size * (body.pagination.page - 1),
        take: body.pagination.size,
      }),
      prismaUser.count(),
    ])

    return {
      list: sqlData[0],
      total: sqlData[1],
    }
  })
}) as FastifyPluginAsync
