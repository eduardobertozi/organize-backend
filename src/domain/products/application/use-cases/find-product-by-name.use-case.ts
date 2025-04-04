import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'
import { Injectable } from '@nestjs/common'
import { Product } from '../../enterprise/entities/product'
import { ProductsRepository } from '../repositories/products.repository'

interface FindProductByNameUseCaseRequest {
  name: string
}

type FindProductByNameUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    product: Product
  }
>

@Injectable()
export class FindProductByNameUseCase {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async execute({
    name,
  }: FindProductByNameUseCaseRequest): Promise<FindProductByNameUseCaseResponse> {
    const product = await this.productsRepository.findByName(name)

    if (!product) {
      return left(new ResourceNotFoundError())
    }

    return right({
      product,
    })
  }
}
