import { UniqueEntityID } from '@/core/unique-entity-id'
import { ServantProduct } from '../../enterprise/entities/servant-product'

export abstract class ServantProductsRepository {
  abstract createMany(servantProducts: ServantProduct[]): Promise<void>
  abstract deleteMany(servantProducts: ServantProduct[]): Promise<void>
  abstract findManyByServantId(
    servantId: UniqueEntityID,
  ): Promise<ServantProduct[]>
  abstract deleteManyByServantId(servantId: UniqueEntityID): Promise<void>
}
