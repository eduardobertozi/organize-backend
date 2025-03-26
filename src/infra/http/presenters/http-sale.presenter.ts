import { Sale } from '@/domain/sales/enterprise/entities/sale'

export class SalePresenter {
  static toHTTP(sale: Sale) {
    return {
      id: sale.id.toString(),
      description: sale.description,
      amount: sale.amount,
      createdAt: sale.createdAt,
      updatedAt: sale.updatedAt,
    }
  }
}
