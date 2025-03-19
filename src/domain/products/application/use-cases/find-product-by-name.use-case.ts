import { Either, right } from '@/core/either'
import { Product } from '../../enterprise/entities/product'
import { ProductsRepository } from '../repositories/products.repository'
import { Injectable } from '@nestjs/common'

interface FindProductByNameUseCaseRequest {
  name: string
  page?: number
}

type FindProductByNameUseCaseResponse = Either<
  null,
  {
    products: Product[]
  }
>

@Injectable()
export class FindProductByNameUseCase {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async execute({
    name,
    page = 1,
  }: FindProductByNameUseCaseRequest): Promise<FindProductByNameUseCaseResponse> {
    const products = await this.productsRepository.findByName(name, { page })

    return right({
      products,
    })
  }
}
