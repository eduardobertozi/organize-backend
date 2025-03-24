import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'
import { Injectable } from '@nestjs/common'
import { ServantProductsRepository } from '../repositories/servant-products.repository'

interface DeleteServantProductUseCaseRequest {
  servantProductId: string
}

type DeleteServantProductUseCaseResponse = Either<ResourceNotFoundError, null>

@Injectable()
export class DeleteServantProductUseCase {
  constructor(
    private readonly servantProductsRepository: ServantProductsRepository,
  ) {}

  async execute({
    servantProductId,
  }: DeleteServantProductUseCaseRequest): Promise<DeleteServantProductUseCaseResponse> {
    const servantProduct =
      await this.servantProductsRepository.findById(servantProductId)

    if (!servantProduct) {
      return left(new ResourceNotFoundError())
    }

    await this.servantProductsRepository.delete(servantProduct)

    return right(null)
  }
}
