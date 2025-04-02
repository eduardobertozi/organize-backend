import { WatchedList } from '@/core/entities/watched-list'
import { ServantProduct } from './servant-product'

export class ServantProductsList extends WatchedList<ServantProduct> {
  compareItems(a: ServantProduct, b: ServantProduct): boolean {
    return a.servantId.equals(b.servantId)
  }
}
