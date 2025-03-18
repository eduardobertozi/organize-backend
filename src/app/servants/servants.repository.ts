import { UniqueEntityID } from '@/core/unique-entity-id'
import { Servant } from './servant.entity'

export abstract class ServantRepository {
  abstract findById(id: UniqueEntityID): Promise<Servant | null>
  abstract findByName(name: string, page?: number): Promise<Servant[]>
  abstract findAll(page: number): Promise<Servant[]>
  abstract create(servant: Servant): Promise<void>
  abstract save(servant: Servant): Promise<void>
  abstract delete(servant: Servant): Promise<void>
}
