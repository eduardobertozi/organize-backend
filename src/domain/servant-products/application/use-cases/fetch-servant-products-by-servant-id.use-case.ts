import { Injectable } from '@nestjs/common'
import { ServantProductsRepository } from '../repositories/servant-products.repository'
import { ServantProduct } from '../../entreprise/entities/servant-product'
import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'
import { UniqueEntityID } from '@/core/unique-entity-id'

interface FetchServantProductsByServantIdUseCaseRequest {
  servantId: string
}

type FetchServantProductsByServantIdUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    servantProducts: ServantProduct[]
  }
>

@Injectable()
export class FetchServantProductsByServantIdUseCase {
  constructor(
    private readonly servantProductsRepository: ServantProductsRepository,
  ) {}

  async execute({
    servantId,
  }: FetchServantProductsByServantIdUseCaseRequest): Promise<FetchServantProductsByServantIdUseCaseResponse> {
    const servantProducts =
      await this.servantProductsRepository.fetchAllByServantId(
        new UniqueEntityID(servantId),
      )

    if (servantProducts.length < 1) {
      return left(new ResourceNotFoundError())
    }

    return right({
      servantProducts,
    })
  }
}
