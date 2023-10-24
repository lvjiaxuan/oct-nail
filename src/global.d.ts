type QueryPagination = {
  size: number;
  page: number;
}

type ReturnPagination = {
  total: number;
}

type ParseSchemaQuery<T extends object> = Partial<Omit<T, 'is_deleted' | 'update_time' | 'create_time' | 'updated_by' | 'created_by'>>
