import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { StorageModule } from '../storage/storage.module'
import { CreateAccountController } from './controllers/users/create-account.controller'
import { RegisterUserUseCase } from '@/domain/user/application/use-cases/register-user'
import { AuthenticateController } from './controllers/users/authenticate.controller'
import { AuthenticateUserUseCase } from '@/domain/user/application/use-cases/authenticate-user'
import { CreateProductController } from './controllers/products/create-product.controller'
import { CreateProductUseCase } from '@/domain/products/application/use-cases/create-product.use-case'
import { CreateSupplierController } from './controllers/suppliers/create-supplier.controller'
import { CreateSupplierUseCase } from '@/domain/suppliers/application/use-cases/create-supplier.use-case'
import { EditProductController } from './controllers/products/edit-product.controller'
import { EditProductUseCase } from '@/domain/products/application/use-cases/edit-product.use-case'
import { DeleteProductController } from './controllers/products/delete-product.controller'
import { DeleteProductUseCase } from '@/domain/products/application/use-cases/delete-product.use-case'

@Module({
  imports: [DatabaseModule, CryptographyModule, StorageModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateProductController,
    CreateSupplierController,
    EditProductController,
    DeleteProductController,
  ],
  providers: [
    RegisterUserUseCase,
    AuthenticateUserUseCase,
    CreateProductUseCase,
    CreateSupplierUseCase,
    EditProductUseCase,
    DeleteProductUseCase,
  ],
})
export class HttpModule {}
