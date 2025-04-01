import { Either, right } from '@/core/either'
import { Servant } from '../../enterprise/entities/servant'
import { ServantsRepository } from '../repositories/servants.repository'
import { Injectable } from '@nestjs/common'
import { PaginationResponse } from '@/core/pagination-response'

interface FetchAllServantsUseCaseRequest {
  q?: string
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
    q,
    page = 1,
  }: FetchAllServantsUseCaseRequest): Promise<FetchAllServantsUseCaseResponse> {
    const { servants, total } = await this.servantRepository.findAll({
      q,
      page,
    })

    console.log(servants, 'SERVANTS')

    const paginationResponse = PaginationResponse.create({
      total,
      page,
    })

    return right({
      ...paginationResponse,
      total,
      servants,
    })
  }
}
