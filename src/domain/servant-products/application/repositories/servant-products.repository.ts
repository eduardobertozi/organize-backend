import { UniqueEntityID } from '@/core/unique-entity-id'
import { ServantProduct } from '../../entreprise/entities/servant-product'

export abstract class ServantProductsRepository {
  abstract findServantProduct({
    productId,
    servantId,
  }: {
    productId: UniqueEntityID
    servantId: UniqueEntityID
  }): Promise<ServantProduct | null>
  abstract fetchAllByServantId(
    servantId: UniqueEntityID,
  ): Promise<ServantProduct[]>
  abstract create(servantProduct: ServantProduct): Promise<void>
  abstract delete(servantProduct: ServantProduct): Promise<void>
}
