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
import { FindProductByIdController } from './controllers/products/find-product-by-id.controller'
import { FindProductByIdUseCase } from '@/domain/products/application/use-cases/find-product-by-id.use-case'
import { FindProductByNameUseCase } from '@/domain/products/application/use-cases/find-product-by-name.use-case'
import { FindProductsByNameController } from './controllers/products/find-products-by-name.controller'
import { FetchAllProductsController } from './controllers/products/fetch-all-products.controller'
import { FetchAllProductsUseCase } from '@/domain/products/application/use-cases/fetch-all-products.use-case'
import { CreateServantController } from './controllers/servants/create-servant.controller'
import { CreateServantUseCase } from '@/domain/servants/application/use-cases/create-servant.use-case'

@Module({
  imports: [DatabaseModule, CryptographyModule, StorageModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateProductController,
    CreateSupplierController,
    EditProductController,
    DeleteProductController,
    FindProductByIdController,
    FindProductsByNameController,
    FetchAllProductsController,
    CreateServantController,
  ],
  providers: [
    RegisterUserUseCase,
    AuthenticateUserUseCase,
    CreateProductUseCase,
    CreateSupplierUseCase,
    EditProductUseCase,
    DeleteProductUseCase,
    FindProductByIdUseCase,
    FindProductByNameUseCase,
    FetchAllProductsUseCase,
    CreateServantUseCase,
  ],
})
export class HttpModule {}
