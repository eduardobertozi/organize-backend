import { Either, left, right } from '@/core/either'
import { AlreadyExistsError } from '@/core/errors/already-exists.error'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'
import { ServantsRepository } from '../repositories/servants.repository'
import { Injectable } from '@nestjs/common'
import { UniqueEntityID } from '@/core/unique-entity-id'
import { Servant } from '../../enterprise/entities/servant'

interface DeleteServantUseCaseRequest {
  servantId: string
}

type DeleteServantUseCaseResponse = Either<
  AlreadyExistsError | ResourceNotFoundError,
  {
    servant: Servant
  }
>

@Injectable()
export class DeleteServantUseCase {
  constructor(private readonly servantRepository: ServantsRepository) {}

  async execute({
    servantId,
  }: DeleteServantUseCaseRequest): Promise<DeleteServantUseCaseResponse> {
    const servant = await this.servantRepository.findById(
      new UniqueEntityID(servantId),
    )

    if (!servant) {
      return left(new ResourceNotFoundError())
    }

    await this.servantRepository.delete(servant)

    return right({
      servant,
    })
  }
}
