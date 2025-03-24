import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { ServantsRepository } from '../repositories/servants.repository'
import { ServantProductsRepository } from '../repositories/servant-products.repository'
import { ServantProduct } from '../../enterprise/entities/servant-product'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'
import { UniqueEntityID } from '@/core/unique-entity-id'

interface ServantProductRequest {
  servantId: string
  productId: string
}

type ServantProductResponse = Either<
  ResourceNotFoundError,
  {
    servantProduct: ServantProduct
  }
>

@Injectable()
export class CreateServantProductUseCase {
  constructor(
    private readonly servantsRepository: ServantsRepository,
    private readonly servantProductsRepository: ServantProductsRepository,
  ) {}

  async execute({
    servantId,
    productId,
  }: ServantProductRequest): Promise<ServantProductResponse> {
    const servant = await this.servantsRepository.findById(servantId)

    if (!servant) {
      return left(new ResourceNotFoundError())
    }

    const servantProduct = ServantProduct.create({
      productId: new UniqueEntityID(productId),
      servantId: servant.id,
    })

    await this.servantProductsRepository.create(servantProduct)

    return right({
      servantProduct,
    })
  }
}
