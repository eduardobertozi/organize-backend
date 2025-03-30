export interface PaginationResponse {
  total: number
  hasMore: boolean
  nextPage: number | null
  previousPage: number | null
}
