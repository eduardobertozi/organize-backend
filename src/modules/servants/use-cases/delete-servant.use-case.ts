import { Either, left, right } from '@/core/either'
import { AlreadyExistsError } from '@/core/errors/already-exists.error'
import { UniqueEntityID } from '@/core/unique-entity-id'

import { ServantRepository } from '../servants.repository'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'

interface DeleteServantUseCaseRequest {
  id: UniqueEntityID
  name: string
  productIds: string[]
  productsPrice: number
  workForcePrice: number
  profitPercent: number
}

type DeleteServantUseCaseResponse = Either<
  AlreadyExistsError | ResourceNotFoundError,
  null
>

export class DeleteServantUseCase {
  constructor(private readonly servantRepository: ServantRepository) {}

  async execute(
    params: DeleteServantUseCaseRequest,
  ): Promise<DeleteServantUseCaseResponse> {
    const servantExists = await this.servantRepository.findById(params.id)

    if (!servantExists) {
      return left(new ResourceNotFoundError())
    }

    await this.servantRepository.delete(servantExists)

    return right(null)
  }
}
