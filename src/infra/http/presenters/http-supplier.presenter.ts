import { Supplier } from '@/domain/suppliers/enterprise/entities/supplier'

export class SupplierPresenter {
  static toHTTP(supplier: Supplier) {
    return {
      id: supplier.id.toString(),
      name: supplier.name,
      phone: supplier.phone,
      email: supplier.email,
      city: supplier.city,
      state: supplier.state,
      address: supplier.address,
      createdAt: supplier.createdAt,
      updatedAt: supplier.updatedAt,
    }
  }
}
