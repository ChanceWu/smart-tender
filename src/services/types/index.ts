export interface PaginationResult<T> {
  page: number;
  pageSize: number;
  size: number;
  resultList: T[];
}
