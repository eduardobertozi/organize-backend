import { ServantProduct } from '../../entreprise/entities/servant-product'

export abstract class ServantProductsRepository {
  abstract findUniqueByServantId(
    servantId: string,
  ): Promise<ServantProduct | null>
  abstract fetchAllByServantId(servantId: string): Promise<ServantProduct[]>
  abstract create(servantProduct: ServantProduct): Promise<void>
  abstract delete(servantProduct: ServantProduct): Promise<void>
}
