import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'
import { Servant } from '../../enterprise/entities/servant'
import { ServantRepository } from '../repositories/servants.repository'
import { Injectable } from '@nestjs/common'

interface FindServantByIdUseCaseRequest {
  servantId: string
}

type FindServantByIdUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    servant: Servant
  }
>

@Injectable()
export class FindServantByIdUseCase {
  constructor(private readonly servantRepository: ServantRepository) {}

  async execute({
    servantId,
  }: FindServantByIdUseCaseRequest): Promise<FindServantByIdUseCaseResponse> {
    const servant = await this.servantRepository.findById(servantId)

    if (!servant) {
      return left(new ResourceNotFoundError())
    }

    return right({
      servant,
    })
  }
}
