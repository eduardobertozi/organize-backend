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
import { FetchAllServantsController } from './controllers/servants/fetch-all-servants.controller'
import { FetchAllServantsUseCase } from '@/domain/servants/application/use-cases/fetch-all-servants.use-case'
import { CreateServantProductController } from './controllers/servant-products/create-servant-products.controller'
import { CreateServantProductUseCase } from '@/domain/servant-products/application/use-cases/create-servant-product.use-case'
import { DeleteServantProductController } from './controllers/servant-products/delete-servant-product.controller'
import { DeleteServantProductUseCase } from '@/domain/servant-products/application/use-cases/delete-servant-product.use-case'
import { FindServantProductsByServantIdController } from './controllers/servant-products/find-servant-products-by-servant-id.controller'
import { FindServantProductsByServantIdUseCase } from '@/domain/servant-products/application/use-cases/find-servant-products-by-servant-id.use-case'
import { CreateSaleController } from './controllers/sales/create-sale.controller'
import { CreateSaleUseCase } from '@/domain/sales/application/use-cases/create-sale.use-case'
import { DeleteSaleController } from './controllers/sales/delete-sale.controller'
import { DeleteSaleUseCase } from '@/domain/sales/application/use-cases/delete-sale.use-case'
import { EditSaleController } from './controllers/sales/edit-sale.controller'
import { EditSaleUseCase } from '@/domain/sales/application/use-cases/edit-sale.use-case'
import { FetchAllSalesController } from './controllers/sales/fetch-all-sales.controller'
import { FetchAllSalesUseCase } from '@/domain/sales/application/use-cases/fetch-all-sales.use-case'
import { FindSaleByIdController } from './controllers/sales/find-sale-by-id.controller'
import { FindSaleByIdUseCase } from '@/domain/sales/application/use-cases/find-sale-by-id.use-case'
import { CreateSaleServantController } from './controllers/sale-servants/create-sale-servant.controller'
import { CreateSaleServantUseCase } from '@/domain/sale-servants/application/use-cases/create-sale-servant.use-case'
import { DeleteSaleServantController } from './controllers/sale-servants/delete-sale-servant.controller'
import { DeleteSaleServantUseCase } from '@/domain/sale-servants/application/use-cases/delete-sale-servant.use-case'
import { FindSaleServantBySaleIdController } from './controllers/sale-servants/find-sale-servant-by-sale-id.controller'
import { FindSaleServantBySaleIdUseCase } from '@/domain/sale-servants/application/use-cases/find-sale-servants-by-sale-id.use-case'
import { FindSaleServantByIdController } from './controllers/sale-servants/find-sale-servant-by-id.controller'
import { FindSaleServantByIdUseCase } from '@/domain/sale-servants/application/use-cases/find-sale-servant-by-id.use-case'

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
    FetchAllServantsController,
    CreateServantProductController,
    DeleteServantProductController,
    FindServantProductsByServantIdController,
    CreateSaleController,
    DeleteSaleController,
    EditSaleController,
    FetchAllSalesController,
    FindSaleByIdController,
    CreateSaleServantController,
    DeleteSaleServantController,
    FindSaleServantBySaleIdController,
    FindSaleServantByIdController,
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
    FetchAllServantsUseCase,
    CreateServantProductUseCase,
    DeleteServantProductUseCase,
    FindServantProductsByServantIdUseCase,
    CreateSaleUseCase,
    DeleteSaleUseCase,
    EditSaleUseCase,
    FetchAllSalesUseCase,
    FindSaleByIdUseCase,
    CreateSaleServantUseCase,
    DeleteSaleServantUseCase,
    FindSaleServantBySaleIdUseCase,
    FindSaleServantByIdUseCase,
  ],
})
export class HttpModule {}
