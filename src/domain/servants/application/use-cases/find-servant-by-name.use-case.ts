import { Either, right } from '@/core/either'
import { Servant } from '../../enterprise/entities/servant'
import { ServantsRepository } from '../repositories/servants.repository'
import { Injectable } from '@nestjs/common'

interface FindServantByNameUseCaseRequest {
  name: string
  page?: number
}

type FindServantByNameUseCaseResponse = Either<
  null,
  {
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
    const servants = await this.servantRepository.findByName(name, { page })

    return right({
      servants,
    })
  }
}
