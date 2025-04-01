import { Either, left, right } from '@/core/either'
import { AlreadyExistsError } from '@/core/errors/already-exists.error'
import { Servant } from '../../enterprise/entities/servant'
import { ServantsRepository } from '../repositories/servants.repository'
import { Injectable } from '@nestjs/common'

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
    const servant = Servant.create(params)
    const servantAlreadyExists = await this.servantRepository.findByName(
      servant.name,
    )

    if (servantAlreadyExists) {
      return left(new AlreadyExistsError())
    }

    await this.servantRepository.create(servant)

    return right({
      servant,
    })
  }
}
