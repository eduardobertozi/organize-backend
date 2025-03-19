import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'
import { UniqueEntityID } from '@/core/unique-entity-id'
import { Servant } from '../../enterprise/entities/servant'
import { ServantRepository } from '../repositories/servants.repository'
import { Injectable } from '@nestjs/common'

interface FindServantByIdUseCaseRequest {
  id: UniqueEntityID
}

type FindServantByIdUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    servant: Servant
  }
>

@Injectable()
export class FindServantByIdUseCase {
  constructor(private readonly servantRepository: ServantRepository) {}

  async execute({
    id,
  }: FindServantByIdUseCaseRequest): Promise<FindServantByIdUseCaseResponse> {
    const servant = await this.servantRepository.findById(id)

    if (!servant) {
      return left(new ResourceNotFoundError())
    }

    return right({
      servant,
    })
  }
}
