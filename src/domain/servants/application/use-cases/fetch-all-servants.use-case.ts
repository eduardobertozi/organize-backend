import { Either, right } from '@/core/either'
import { Servant } from '../../enterprise/entities/servant'
import { ServantsRepository } from '../repositories/servants.repository'
import { Injectable } from '@nestjs/common'
import { PaginationResponse } from '@/core/pagination-response'

interface FetchAllServantsUseCaseRequest {
  page?: number
}

type FetchAllServantsUseCaseResponse = Either<
  null,
  PaginationResponse & {
    servants: Servant[]
  }
>

@Injectable()
export class FetchAllServantsUseCase {
  constructor(private readonly servantRepository: ServantsRepository) {}

  async execute({
    page = 1,
  }: FetchAllServantsUseCaseRequest): Promise<FetchAllServantsUseCaseResponse> {
    const { servants, total } = await this.servantRepository.findAll({ page })

    return right({
      total,
      hasMore: total > page * 10,
      nextPage: total > page * 10 ? page + 1 : null,
      previousPage: page > 1 ? page - 1 : null,
      servants,
    })
  }
}
