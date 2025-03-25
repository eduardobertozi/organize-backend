import { Injectable } from '@nestjs/common'
import { ServantProductsRepository } from '../repositories/servant-products.repository'
import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'
import { UniqueEntityID } from '@/core/unique-entity-id'

interface DeleteServantProductUseCaseRequest {
  servantId: string
}

type DeleteServantProductUseCaseResponse = Either<ResourceNotFoundError, null>

@Injectable()
export class DeleteServantProductUseCase {
  constructor(
    private readonly servantProductsRepository: ServantProductsRepository,
  ) {}

  async execute({
    servantId,
  }: DeleteServantProductUseCaseRequest): Promise<DeleteServantProductUseCaseResponse> {
    const servantProduct =
      await this.servantProductsRepository.findUniqueByServantId(
        new UniqueEntityID(servantId),
      )

    if (!servantProduct) {
      return left(new ResourceNotFoundError())
    }

    await this.servantProductsRepository.delete(servantProduct)

    return right(null)
  }
}
