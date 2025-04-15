import { Sale } from '@/domain/sales/enterprise/entities/sale'

export class SalePresenter {
  static toHTTP(sale: Sale) {
    return {
      id: sale.id.toString(),
      description: sale.description,
      amount: sale.amount,
      servants: sale.servants
        .getItems()
        .map((servant) => servant.servantId.toString()),
      createdAt: sale.createdAt,
      updatedAt: sale.updatedAt,
    }
  }
}
