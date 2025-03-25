import { SaleServant } from '../../enterprise/entities/sale-servant'

export abstract class SaleServantsRepository {
  abstract findBySaleId(saleId: string): Promise<SaleServant[]>
  abstract create(saleServant: SaleServant): Promise<SaleServant>
  abstract delete(saleServant: SaleServant): Promise<void>
}
