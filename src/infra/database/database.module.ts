import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { Module } from '@nestjs/common'
import { PrismaUsersService } from './prisma/services/prisma-users.service'
import { UsersRepository } from '@/domain/user/application/repositories/users.repository'
import { PrismaProductsService } from './prisma/services/prisma-products.service'
import { ProductsRepository } from '@/domain/products/application/repositories/products.repository'
import { PrismaAttachmentsService } from './prisma/services/prisma-attachments.service'
import { AttachmentsRepository } from '@/domain/attachments/application/repositories/attachments.repository'

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
  ],
  exports: [
    PrismaService,
    UsersRepository,
    ProductsRepository,
    AttachmentsRepository,
  ],
})
export class DatabaseModule {}
