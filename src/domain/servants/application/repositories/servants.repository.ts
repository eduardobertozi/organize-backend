import { PaginationParams } from '@/core/pagination-params'
import { Servant } from '../../enterprise/entities/servant'

export abstract class ServantRepository {
  abstract findById(id: string): Promise<Servant | null>
  abstract findByName(
    name: string,
    params?: PaginationParams,
  ): Promise<Servant[]>
  abstract findAll(params: PaginationParams): Promise<Servant[]>
  abstract create(servant: Servant): Promise<void>
  abstract save(servant: Servant): Promise<void>
  abstract delete(servant: Servant): Promise<void>
}
