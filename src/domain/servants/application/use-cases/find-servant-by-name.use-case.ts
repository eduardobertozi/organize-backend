import { Either, right } from '@/core/either'
import { Servant } from '../../enterprise/entities/servant'
import { ServantsRepository } from '../repositories/servants.repository'
import { Injectable } from '@nestjs/common'
import { PaginationResponse } from '@/core/pagination-response'

interface FindServantByNameUseCaseRequest {
  name: string
  page?: number
}

type FindServantByNameUseCaseResponse = Either<
  null,
  PaginationResponse & {
    servants: Servant[]
  }
>

@Injectable()
export class FindServantByNameUseCase {
  constructor(private readonly servantRepository: ServantsRepository) {}

  async execute({
    name,
    page = 1,
  }: FindServantByNameUseCaseRequest): Promise<FindServantByNameUseCaseResponse> {
    const { total, servants } = await this.servantRepository.findByName(name, {
      page,
    })

    const { hasMore, nextPage, previousPage } = PaginationResponse.create({
      total,
      page,
    })

    return right({
      total,
      hasMore,
      nextPage,
      previousPage,
      servants,
    })
  }
}
