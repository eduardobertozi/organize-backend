import { Either, left, right } from '@/core/either'
import { Servant } from '../../enterprise/entities/servant'
import { ServantsRepository } from '../repositories/servants.repository'
import { Injectable } from '@nestjs/common'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'

interface FindServantByNameUseCaseRequest {
  name: string
}

type FindServantByNameUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    servant: Servant
  }
>

@Injectable()
export class FindServantByNameUseCase {
  constructor(private readonly servantRepository: ServantsRepository) {}

  async execute({
    name,
  }: FindServantByNameUseCaseRequest): Promise<FindServantByNameUseCaseResponse> {
    const servant = await this.servantRepository.findByName(name)

    if (!servant) {
      return left(new ResourceNotFoundError())
    }

    return right({
      servant,
    })
  }
}
