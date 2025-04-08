import { SaleServant } from '@/domain/sales/enterprise/entities/sale-servant'

export class SaleServantsPresenter {
  static toHTTP(saleServant: SaleServant) {
    return {
      id: saleServant.id.toString(),
      saleId: saleServant.saleId.toString(),
      servantId: saleServant.servantId.toString(),
    }
  }
}
