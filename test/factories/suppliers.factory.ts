import { UniqueEntityID } from '@/core/unique-entity-id'
import {
  Supplier,
  SupplierProps,
} from '@/domain/suppliers/enterprise/entities/supplier'
import { PrismaSuppliersMapper } from '@/infra/database/prisma/mappers/prisma-suppliers.mapper'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'

export function makeSupplier(
  override: Partial<SupplierProps> = {},
  id?: UniqueEntityID,
) {
  return Supplier.create(
    {
      name: faker.commerce.productName(),
      phone: faker.phone.number(),
      email: faker.internet.email(),
      city: faker.location.city(),
      state: faker.location.state(),
      address: faker.location.streetAddress(),
      ...override,
    },
    id,
  )
}

@Injectable()
export class SuppliersFactory {
  constructor(private readonly prismaService: PrismaService) {}

  async makePrismaSuppliers(
    data: Partial<SupplierProps> = {},
  ): Promise<Supplier> {
    const supplier = makeSupplier(data)

    await this.prismaService.supplier.create({
      data: PrismaSuppliersMapper.toPrisma(supplier),
    })

    return supplier
  }
}
