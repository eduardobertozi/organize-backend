import { WatchedList } from '@/core/entities/watched-list'
import { SaleServant } from './sale-servant'

export class SaleServantList extends WatchedList<SaleServant> {
  compareItems(a: SaleServant, b: SaleServant): boolean {
    return a.servantId.equals(b.servantId)
  }
}
