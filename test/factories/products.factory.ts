import { UniqueEntityID } from '@/core/unique-entity-id'
import {
  Product,
  ProductProps,
} from '@/domain/products/enterprise/entities/product'
import { faker } from '@faker-js/faker'
import { ProductAttachmentsList } from '@/domain/products/enterprise/entities/product-attachments-list'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { PrismaProductMapper } from '@/infra/database/prisma/mappers/prisma-products.mapper'

export function makeProduct(
  override: Partial<Product> = {},
  id?: UniqueEntityID,
) {
  return Product.create(
    {
      name: faker.commerce.productName(),
      price: faker.number.float({ min: 10, max: 50, fractionDigits: 2 }),
      reference: faker.lorem.word(),
      supplierId: new UniqueEntityID(),
      stock: faker.number.int({ min: 1, max: 100 }),
      attachments: new ProductAttachmentsList(),
      ...override,
    },
    id,
  )
}

@Injectable()
export class ProductsFactory {
  constructor(private readonly prismaService: PrismaService) {}

  async makePrismaProducts(data: Partial<ProductProps> = {}): Promise<Product> {
    const product = makeProduct(data)

    await this.prismaService.product.create({
      data: PrismaProductMapper.toPrisma(product),
    })

    return product
  }
}
