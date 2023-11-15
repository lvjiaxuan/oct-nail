type QueryPagination<T = unknown> = T & {
  pagination: {
    size: number;
    page: number;
  };
}

type ReturnPagination<T> = {
  total: number;
  list: T extends unknown[] ? T : T[];
}

type Fastify = Parameters<import('fastify').FastifyPluginAsync>[0]
