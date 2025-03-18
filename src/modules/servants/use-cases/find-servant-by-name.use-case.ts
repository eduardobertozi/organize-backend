import { Either, right } from '@/core/either'
import { Servant } from '../servant.entity'
import { ServantRepository } from '../servants.repository'

interface FindServantByNameUseCaseRequest {
  name: string
  page?: number
}

type FindServantByNameUseCaseResponse = Either<
  null,
  {
    servants: Servant[]
  }
>

export class FindServantByNameUseCase {
  constructor(private readonly servantRepository: ServantRepository) {}

  async execute({
    name,
    page = 1,
  }: FindServantByNameUseCaseRequest): Promise<FindServantByNameUseCaseResponse> {
    const servants = await this.servantRepository.findByName(name, page)

    return right({
      servants,
    })
  }
}
