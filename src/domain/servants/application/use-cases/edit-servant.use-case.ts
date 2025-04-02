import { Either, left, right } from '@/core/either'
import { AlreadyExistsError } from '@/core/errors/already-exists.error'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'
import { Injectable } from '@nestjs/common'
import { ServantsRepository } from '../repositories/servants.repository'
import { UniqueEntityID } from '@/core/unique-entity-id'
import { Servant } from '@/domain/servants/enterprise/entities/servant'
import { ServantProductsList } from '../../enterprise/entities/servant-products-list'
import { ServantProductsRepository } from '../repositories/servant-products.repository'
import { ServantProduct } from '../../enterprise/entities/servant-product'

interface EditServantUseCaseRequest {
  servantId: string
  name: string
  productsIds: string[]
  productsPrice: number
  workForcePrice: number
  profitPercent: number
}

type EditServantUseCaseResponse = Either<
  AlreadyExistsError | ResourceNotFoundError,
  {
    servant: Servant
  }
>

@Injectable()
export class EditServantUseCase {
  constructor(
    private readonly servantRepository: ServantsRepository,
    private readonly servantProductsRepository: ServantProductsRepository,
  ) {}

  async execute(
    params: EditServantUseCaseRequest,
  ): Promise<EditServantUseCaseResponse> {
    const servant = await this.servantRepository.findById(
      new UniqueEntityID(params.servantId),
    )

    if (!servant) {
      return left(new ResourceNotFoundError())
    }

    const existingServant = await this.servantRepository.findByName(params.name)

    if (existingServant && !existingServant.id.equals(servant.id)) {
      return left(new AlreadyExistsError())
    }

    const currentServantProducts =
      await this.servantProductsRepository.findManyByServantId(
        new UniqueEntityID(params.servantId),
      )

    const servantProductsList = new ServantProductsList(currentServantProducts)

    const servantProducts = params.productsIds.map((productId) =>
      ServantProduct.create({
        productId: new UniqueEntityID(productId),
        servantId: servant.id,
      }),
    )

    servantProductsList.update(servantProducts)

    servant.name = params.name
    servant.productsPrice = params.productsPrice
    servant.profitPercent = params.profitPercent
    servant.workForcePrice = params.workForcePrice
    servant.products = servantProductsList

    await this.servantRepository.save(servant)

    return right({
      servant,
    })
  }
}
