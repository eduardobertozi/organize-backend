import { CryptographyModule } from '@/infrastructure/cryptography/cryptography.module'
import { StorageModule } from '@/infrastructure/storage/storage.module'
import { Module } from '@nestjs/common'
import { DatabaseProductsModule } from './database/database-products.module'
import { AttachmentsModule } from '../attachments/attachments.module'
import { CreateProductController } from './controllers/create-product.controller'
import { CreateProductUseCase } from './use-cases/create-product.use-case'

@Module({
  imports: [
    DatabaseProductsModule,
    AttachmentsModule,
    CryptographyModule,
    StorageModule,
  ],
  controllers: [CreateProductController],
  providers: [CreateProductUseCase],
  exports: [],
})
export class ProductsModule {}
