import { Either, left, right } from '@/core/either'
import { AlreadyExistsError } from '@/core/errors/already-exists.error'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'
import { Injectable } from '@nestjs/common'
import { ServantsRepository } from '../repositories/servants.repository'
import { UniqueEntityID } from '@/core/unique-entity-id'
import { Servant } from '@/domain/servants/enterprise/entities/servant'

interface EditServantUseCaseRequest {
  servantId: string
  name: string
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
  constructor(private readonly servantRepository: ServantsRepository) {}

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

    servant.name = params.name
    servant.productsPrice = params.productsPrice
    servant.profitPercent = params.profitPercent
    servant.workForcePrice = params.workForcePrice

    await this.servantRepository.save(servant)

    return right({
      servant,
    })
  }
}
