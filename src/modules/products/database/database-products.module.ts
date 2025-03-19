import { PrismaService } from '@/infrastructure/database/prisma.service'
import { Module } from '@nestjs/common'
import { PrismaProductService } from './prisma-products.service'
import { ProductsRepository } from '../repositories/products.repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: ProductsRepository,
      useClass: PrismaProductService,
    },
  ],
  exports: [ProductsRepository],
})
export class DatabaseProductsModule {}
