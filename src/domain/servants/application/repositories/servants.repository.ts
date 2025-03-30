import { PaginationParams } from '@/core/pagination-params'
import { Servant } from '../../enterprise/entities/servant'
import { UniqueEntityID } from '@/core/unique-entity-id'

export interface FindManyResponse {
  total: number
  servants: Servant[]
}

export abstract class ServantsRepository {
  abstract findById(id: UniqueEntityID): Promise<Servant | null>
  abstract findByName(
    name: string,
    params?: PaginationParams,
  ): Promise<FindManyResponse>
  abstract findAll(params: PaginationParams): Promise<FindManyResponse>
  abstract create(servant: Servant): Promise<Servant>
  abstract save(servant: Servant): Promise<Servant>
  abstract delete(servant: Servant): Promise<void>
}
