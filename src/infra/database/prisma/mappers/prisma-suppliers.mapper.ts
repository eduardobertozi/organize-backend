import { UniqueEntityID } from '@/core/unique-entity-id'
import { Prisma, Supplier as PrismaSupplier } from '@prisma/client'
import { Supplier } from '@/domain/suppliers/enterprise/entities/supplier'

export class PrismaSuppliersMapper {
  static toDomain(raw: PrismaSupplier): Supplier {
    return Supplier.create(
      {
        name: raw.name,
        phone: raw.phone,
        email: raw.email,
        city: raw.city,
        state: raw.state,
        address: raw.address,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(supplier: Supplier): Prisma.SupplierUncheckedCreateInput {
    return {
      id: supplier.id.toString(),
      name: supplier.name,
      phone: supplier.phone,
      email: supplier.email,
      city: supplier.city,
      state: supplier.state,
      address: supplier.address,
    }
  }
}
