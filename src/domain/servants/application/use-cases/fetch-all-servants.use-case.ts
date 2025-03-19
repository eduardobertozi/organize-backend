import { Either, right } from '@/core/either'
import { Servant } from '../../enterprise/entities/servant'
import { ServantRepository } from '../repositories/servants.repository'

interface FetchAllServantsUseCaseRequest {
  page?: number
}

type FetchAllServantsUseCaseResponse = Either<
  null,
  {
    servants: Servant[]
  }
>

export class FetchAllServantsUseCase {
  constructor(private readonly servantRepository: ServantRepository) {}

  async execute({
    page = 1,
  }: FetchAllServantsUseCaseRequest): Promise<FetchAllServantsUseCaseResponse> {
    const servants = await this.servantRepository.findAll(page)

    return right({
      servants,
    })
  }
}
