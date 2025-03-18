import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'
import { UniqueEntityID } from '@/core/unique-entity-id'
import { Servant } from '../enterprise/servant.entity'
import { ServantRepository } from '../servants.repository'

interface FindServantByIdUseCaseRequest {
  id: UniqueEntityID
}

type FindServantByIdUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    servant: Servant
  }
>

export class FindServantByIdUseCase {
  constructor(private readonly servantRepository: ServantRepository) {}

  async execute({
    id,
  }: FindServantByIdUseCaseRequest): Promise<FindServantByIdUseCaseResponse> {
    const servant = await this.servantRepository.findById(id)

    if (!servant) {
      return left(new ResourceNotFoundError())
    }

    return right({
      servant,
    })
  }
}
