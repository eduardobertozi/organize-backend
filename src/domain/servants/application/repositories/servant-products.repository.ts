import { PaginationParams } from '@/core/pagination-params'
import { ServantProduct } from '../../enterprise/entities/servant-product'

export abstract class ServantProductsRepository {
  abstract findById(id: string): Promise<ServantProduct | null>

  abstract findManyByProductId(
    productId: string,
    params: PaginationParams,
  ): Promise<ServantProduct[]>

  abstract create(servantRepository: ServantProduct): Promise<void>

  abstract delete(servantRepository: ServantProduct): Promise<void>
}
