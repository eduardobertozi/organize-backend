import { Either, left, right } from '@/core/either'
import { AlreadyExistsError } from '@/core/errors/already-exists.error'
import { Servant } from '../../enterprise/entities/servant'
import { ServantRepository } from '../repositories/servants.repository'
import { Injectable } from '@nestjs/common'

interface CreateServantUseCaseRequest {
  name: string
  price: number
  productIds: string[]
  productsPrice: number
  workForcePrice: number
  profitPercent: number
}

type CreateServantUseCaseResponse = Either<AlreadyExistsError, null>

@Injectable()
export class CreateServantUseCase {
  constructor(private readonly servantRepository: ServantRepository) {}

  async execute(
    params: CreateServantUseCaseRequest,
  ): Promise<CreateServantUseCaseResponse> {
    const servant = Servant.create(params)
    const servantExists = await this.servantRepository.findByName(servant.name)

    if (!servantExists || servantExists.length > 0) {
      return left(new AlreadyExistsError())
    }

    await this.servantRepository.create(servant)

    return right(null)
  }
}
