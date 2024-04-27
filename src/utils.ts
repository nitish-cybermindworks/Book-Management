export function createPaginatedResponse<T>({
  results,
  pageNumber,
  totalCount,
  pageSize,
}: {
  results: T[];
  pageNumber: number;
  totalCount: number;
  pageSize: number;
}) {
  return {
    currentPageNumber: pageNumber,
    currentPageSize: results.length,
    totalItems: totalCount,
    totalPages: Math.ceil(totalCount / pageSize),
    results,
  };
}
