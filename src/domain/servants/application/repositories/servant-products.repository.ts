import { PaginationParams } from '@/core/pagination-params'
import { ServantProduct } from '../../enterprise/entities/servant-product'

export abstract class ServantProductsRepository {
  abstract findById(id: string): Promise<ServantProduct | null>

  abstract findManyByServantId(
    ServantId: string,
    params: PaginationParams,
  ): Promise<ServantProduct[]>

  abstract create(servantProduct: ServantProduct): Promise<void>

  abstract delete(servantProduct: ServantProduct): Promise<void>
}
