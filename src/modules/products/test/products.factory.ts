import { UniqueEntityID } from '@/core/unique-entity-id'
import { Product, ProductProps } from '../entities/product'
import { faker } from '@faker-js/faker'
import { ProductAttachmentsList } from '../entities/product-attachments-list'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/infrastructure/database/prisma.service'
import { PrismaProductMapper } from '../database/prisma-products.mapper'

export function makeProduct(
  override: Partial<Product> = {},
  id?: UniqueEntityID,
) {
  return Product.create(
    {
      name: faker.commerce.productName(),
      price: faker.number.float(),
      reference: faker.lorem.word(),
      supplierId: new UniqueEntityID(),
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
