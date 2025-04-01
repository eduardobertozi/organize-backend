import { Injectable } from '@nestjs/common'
import { ServantProductsRepository } from '../repositories/servant-products.repository'
import { ServantProduct } from '../../entreprise/entities/servant-product'
import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'
import { UniqueEntityID } from '@/core/unique-entity-id'

interface FindServantProductUseCaseRequest {
  productId: string
  servantId: string
}

type FindServantProductUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    servantProduct: ServantProduct
  }
>

@Injectable()
export class FindServantProductUseCase {
  constructor(
    private readonly servantProductsRepository: ServantProductsRepository,
  ) {}

  async execute({
    productId,
    servantId,
  }: FindServantProductUseCaseRequest): Promise<FindServantProductUseCaseResponse> {
    const servantProduct =
      await this.servantProductsRepository.findServantProduct({
        productId: new UniqueEntityID(productId),
        servantId: new UniqueEntityID(servantId),
      })

    if (!servantProduct) {
      return left(new ResourceNotFoundError())
    }

    return right({
      servantProduct,
    })
  }
}
