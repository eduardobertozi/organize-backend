import { Injectable } from '@nestjs/common'
import { ServantProductsRepository } from '../repositories/servant-products.repository'
import { Either, left, right } from '@/core/either'
import { ServantProduct } from '../../entreprise/entities/servant-product'
import { ServantsRepository } from '../../../servants/application/repositories/servants.repository'
import { ProductsRepository } from '@/domain/products/application/repositories/products.repository'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'
import { UniqueEntityID } from '@/core/unique-entity-id'

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
    params: CreateServantProductUseCaseRequest,
  ): Promise<CreateServantProductUseCaseResponse> {
    const servantProduct = ServantProduct.create(params)

    const servant = await this.servantsRepository.findById(
      new UniqueEntityID(params.servantId),
    )
    const product = await this.productsRepository.findById(
      new UniqueEntityID(params.productId),
    )

    if (!servant || !product) {
      return left(new ResourceNotFoundError())
    }

    const servantProductAlreadyExists =
      await this.servantProductsRepository.findServantProduct({
        productId: new UniqueEntityID(params.productId),
        servantId: new UniqueEntityID(params.servantId),
      })

    if (servantProductAlreadyExists) {
      return left(new ResourceNotFoundError())
    }

    await this.servantProductsRepository.create(servantProduct)

    return right({
      servantProduct,
    })
  }
}
