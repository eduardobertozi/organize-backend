interface PaginationResponseProps {
  total: number
  page: number
}

export class PaginationResponse {
  total: number
  hasMore: boolean
  nextPage: number | null
  previousPage: number | null

  private constructor({ total, page }: PaginationResponseProps) {
    this.total = total
    this.hasMore = total > page * 10
    this.nextPage = this.hasMore ? page + 1 : null
    this.previousPage = page > 1 ? page - 1 : null
  }

  static create({ total, page }: PaginationResponseProps): PaginationResponse {
    return new PaginationResponse({ page, total })
  }
}
