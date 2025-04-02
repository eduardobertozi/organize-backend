import { Either, left, right } from '@/core/either'
import { AlreadyExistsError } from '@/core/errors/already-exists.error'
import { UniqueEntityID } from '@/core/unique-entity-id'
import { Injectable } from '@nestjs/common'
import { Servant } from '../../enterprise/entities/servant'
import { ServantProduct } from '../../enterprise/entities/servant-product'
import { ServantProductsList } from '../../enterprise/entities/servant-products-list'
import { ServantsRepository } from '../repositories/servants.repository'

interface CreateServantUseCaseRequest {
  name: string
  productsIds: string[]
  productsPrice: number
  workForcePrice: number
  profitPercent: number
}

type CreateServantUseCaseResponse = Either<
  AlreadyExistsError,
  {
    servant: Servant
  }
>

@Injectable()
export class CreateServantUseCase {
  constructor(private readonly servantRepository: ServantsRepository) {}

  async execute(
    params: CreateServantUseCaseRequest,
  ): Promise<CreateServantUseCaseResponse> {
    const servant = Servant.create({
      ...params,
      products: new ServantProductsList(),
    })

    const servantAlreadyExists = await this.servantRepository.findByName(
      servant.name,
    )

    if (servantAlreadyExists) {
      return left(new AlreadyExistsError())
    }

    const servantProducts = params.productsIds.map((productId) =>
      ServantProduct.create({
        productId: new UniqueEntityID(productId),
        servantId: servant.id,
      }),
    )

    servant.products = new ServantProductsList(servantProducts)

    await this.servantRepository.create(servant)

    return right({
      servant,
    })
  }
}
