type QueryPagination<T = unknown> = T & {
  pagination: {
    size: number;
    page: number;
  };
}

type ReturnPagination<T> = {
  total: number;
  list: T[];
}

type Fastify = Parameters<import('fastify').FastifyPluginAsync>[0]
