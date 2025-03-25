import { Injectable } from '@nestjs/common'
import { ServantProductsRepository } from '../repositories/servant-products.repository'
import { Either, left, right } from '@/core/either'
import { ServantProduct } from '../../enterprise/entities/servant-product'
import { ServantsRepository } from '../repositories/servants.repository'
import { ProductsRepository } from '@/domain/products/application/repositories/products.repository'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'

interface CreateServantProductUseCaseRequest {
  servantId: string
  productId: string
}

type CreateServantProductUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    servantProduct: ServantProduct
  }
>

@Injectable()
export class CreateServantProductUseCase {
  constructor(
    private readonly servantProductsRepository: ServantProductsRepository,
    private readonly servantsRepository: ServantsRepository,
    private readonly productsRepository: ProductsRepository,
  ) {}

  async execute(
    data: CreateServantProductUseCaseRequest,
  ): Promise<CreateServantProductUseCaseResponse> {
    const servantProduct = ServantProduct.create(data)

    const servant = await this.servantsRepository.findById(data.servantId)
    const product = await this.productsRepository.findById(data.productId)

    if (!servant || !product) {
      return left(new ResourceNotFoundError())
    }

    await this.servantProductsRepository.create(servantProduct)

    return right({
      servantProduct,
    })
  }
}
