import { Injectable } from '@nestjs/common'
import { ServantProductsRepository } from '../repositories/servant-products.repository'
import { ServantProduct } from '../../enterprise/entities/servant-product'
import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'

interface FindServantProductsByServantIdUseCaseRequest {
  servantId: string
}

type FindServantProductsByServantIdUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    servantProducts: ServantProduct[]
  }
>

@Injectable()
export class FindServantProductsByServantIdUseCase {
  constructor(
    private readonly servantProductsRepository: ServantProductsRepository,
  ) {}

  async execute({
    servantId,
  }: FindServantProductsByServantIdUseCaseRequest): Promise<FindServantProductsByServantIdUseCaseResponse> {
    const servantProducts =
      await this.servantProductsRepository.fetchAllByServantId(servantId)

    if (servantProducts.length < 1) {
      return left(new ResourceNotFoundError())
    }

    return right({
      servantProducts,
    })
  }
}
