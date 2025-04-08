import { AttachmentsRepository } from '@/domain/attachments/application/repositories/attachments.repository'
import { ProductsAttachmentsRepository } from '@/domain/products/application/repositories/product-attachments.repository'
import { ProductsRepository } from '@/domain/products/application/repositories/products.repository'
import { ServantsRepository } from '@/domain/servants/application/repositories/servants.repository'
import { SuppliersRepository } from '@/domain/suppliers/application/repositories/suppliers.repository'
import { UsersRepository } from '@/domain/user/application/repositories/users.repository'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { Module } from '@nestjs/common'
import { PrismaAttachmentsService } from './prisma/services/prisma-attachments.service'
import { PrismaProductAttachmentsService } from './prisma/services/prisma-products-attachments.service'
import { PrismaProductsService } from './prisma/services/prisma-products.service'
import { PrismaServantsService } from './prisma/services/prisma-servants.service'
import { PrismaSuppliersService } from './prisma/services/prisma-suppliers.service'
import { PrismaUsersService } from './prisma/services/prisma-users.service'
import { PrismaServantProductsService } from './prisma/services/prisma-servant-products.service'
import { SalesRepository } from '@/domain/sales/application/repositories/sales.repository'
import { PrismaSalesService } from './prisma/services/prisma-sales.service'
import { PrismaSaleServantsService } from './prisma/services/prisma-sale-servants.service'
import { ServantProductsRepository } from '@/domain/servants/application/repositories/servant-products.repository'
import { SaleServantsRepository } from '@/domain/sales/application/repositories/sale-servants.repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: UsersRepository,
      useClass: PrismaUsersService,
    },
    {
      provide: ProductsRepository,
      useClass: PrismaProductsService,
    },
    {
      provide: AttachmentsRepository,
      useClass: PrismaAttachmentsService,
    },
    {
      provide: SuppliersRepository,
      useClass: PrismaSuppliersService,
    },
    {
      provide: ProductsAttachmentsRepository,
      useClass: PrismaProductAttachmentsService,
    },
    {
      provide: ServantsRepository,
      useClass: PrismaServantsService,
    },
    {
      provide: ServantProductsRepository,
      useClass: PrismaServantProductsService,
    },
    {
      provide: SalesRepository,
      useClass: PrismaSalesService,
    },
    {
      provide: SaleServantsRepository,
      useClass: PrismaSaleServantsService,
    },
  ],
  exports: [
    PrismaService,
    UsersRepository,
    ProductsRepository,
    AttachmentsRepository,
    SuppliersRepository,
    ProductsAttachmentsRepository,
    ServantsRepository,
    ServantProductsRepository,
    SalesRepository,
    SaleServantsRepository,
  ],
})
export class DatabaseModule {}
