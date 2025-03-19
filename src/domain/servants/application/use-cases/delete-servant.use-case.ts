import { Either, left, right } from '@/core/either'
import { AlreadyExistsError } from '@/core/errors/already-exists.error'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'
import { ServantRepository } from '../repositories/servants.repository'
import { Injectable } from '@nestjs/common'

interface DeleteServantUseCaseRequest {
  servantId: string
}

type DeleteServantUseCaseResponse = Either<
  AlreadyExistsError | ResourceNotFoundError,
  null
>

@Injectable()
export class DeleteServantUseCase {
  constructor(private readonly servantRepository: ServantRepository) {}

  async execute({
    servantId,
  }: DeleteServantUseCaseRequest): Promise<DeleteServantUseCaseResponse> {
    const servant = await this.servantRepository.findById(servantId)

    if (!servant) {
      return left(new ResourceNotFoundError())
    }

    await this.servantRepository.delete(servant)

    return right(null)
  }
}
