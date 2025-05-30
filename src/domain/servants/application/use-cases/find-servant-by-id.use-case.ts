import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'
import { Servant } from '../../enterprise/entities/servant'
import { ServantsRepository } from '../repositories/servants.repository'
import { Injectable } from '@nestjs/common'
import { UniqueEntityID } from '@/core/unique-entity-id'

interface FindServantByIdUseCaseRequest {
  servantId: string
}

type FindServantByIdUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    servant: Servant
  }
>

@Injectable()
export class FindServantByIdUseCase {
  constructor(private readonly servantRepository: ServantsRepository) {}

  async execute({
    servantId,
  }: FindServantByIdUseCaseRequest): Promise<FindServantByIdUseCaseResponse> {
    const servant = await this.servantRepository.findById(
      new UniqueEntityID(servantId),
    )

    if (!servant) {
      return left(new ResourceNotFoundError())
    }

    return right({
      servant,
    })
  }
}
