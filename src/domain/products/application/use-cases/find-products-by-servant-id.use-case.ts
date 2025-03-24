import { Either, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { Product } from '../../enterprise/entities/product'
import { ProductsRepository } from '../repositories/products.repository'

interface FindProductsByServantIdUseCaseRequest {
  servantId: string
}

type FindProductsByServantIdUseCaseResponse = Either<
  null,
  {
    products: Product[]
  }
>

@Injectable()
export class FindProductsByServantIdUseCase {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async execute({
    servantId,
  }: FindProductsByServantIdUseCaseRequest): Promise<FindProductsByServantIdUseCaseResponse> {
    const products = await this.productsRepository.findByServantId(servantId)

    return right({
      products,
    })
  }
}
