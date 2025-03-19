import { Either, left, right } from '@/core/either'
import { AlreadyExistsError } from '@/core/errors/already-exists.error'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'
import { Injectable } from '@nestjs/common'
import { ServantRepository } from '../repositories/servants.repository'

interface EditServantUseCaseRequest {
  servantId: string
  name: string
  productIds: string[]
  productsPrice: number
  workForcePrice: number
  profitPercent: number
}

type EditServantUseCaseResponse = Either<
  AlreadyExistsError | ResourceNotFoundError,
  null
>

@Injectable()
export class EditServantUseCase {
  constructor(private readonly servantRepository: ServantRepository) {}

  async execute(
    params: EditServantUseCaseRequest,
  ): Promise<EditServantUseCaseResponse> {
    const servantExists = await this.servantRepository.findById(
      params.servantId,
    )

    if (!servantExists) {
      return left(new ResourceNotFoundError())
    }

    const newNameBelongsToAnotherExistandServant =
      await this.servantRepository.findByName(params.name)

    if (newNameBelongsToAnotherExistandServant.length > 0) {
      return left(new AlreadyExistsError())
    }

    servantExists.name = params.name
    servantExists.productIds = params.productIds
    servantExists.productsPrice = params.productsPrice
    servantExists.profitPercent = params.profitPercent
    servantExists.workForcePrice = params.workForcePrice

    await this.servantRepository.save(servantExists)

    return right(null)
  }
}
