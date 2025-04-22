import { CreateProductUseCase } from '@/domain/products/application/use-cases/create-product.use-case'
import { DeleteProductUseCase } from '@/domain/products/application/use-cases/delete-product.use-case'
import { EditProductUseCase } from '@/domain/products/application/use-cases/edit-product.use-case'
import { FetchAllProductsUseCase } from '@/domain/products/application/use-cases/fetch-all-products.use-case'
import { FindProductByIdUseCase } from '@/domain/products/application/use-cases/find-product-by-id.use-case'
import { FindProductByNameUseCase } from '@/domain/products/application/use-cases/find-product-by-name.use-case'
import { CreateSaleUseCase } from '@/domain/sales/application/use-cases/create-sale.use-case'
import { DeleteSaleUseCase } from '@/domain/sales/application/use-cases/delete-sale.use-case'
import { EditSaleUseCase } from '@/domain/sales/application/use-cases/edit-sale.use-case'
import { FetchAllSalesUseCase } from '@/domain/sales/application/use-cases/fetch-all-sales.use-case'
import { FindSaleByIdUseCase } from '@/domain/sales/application/use-cases/find-sale-by-id.use-case'
import { CreateServantUseCase } from '@/domain/servants/application/use-cases/create-servant.use-case'
import { DeleteServantUseCase } from '@/domain/servants/application/use-cases/delete-servant.use-case'
import { EditServantUseCase } from '@/domain/servants/application/use-cases/edit-servant.use-case'
import { FetchAllServantsUseCase } from '@/domain/servants/application/use-cases/fetch-all-servants.use-case'
import { FindServantByIdUseCase } from '@/domain/servants/application/use-cases/find-servant-by-id.use-case'
import { FindServantByNameUseCase } from '@/domain/servants/application/use-cases/find-servant-by-name.use-case'
import { CreateSupplierUseCase } from '@/domain/suppliers/application/use-cases/create-supplier.use-case'
import { DeleteSupplierUseCase } from '@/domain/suppliers/application/use-cases/delete-supplier.use-case'
import { EditSupplierUseCase } from '@/domain/suppliers/application/use-cases/edit-supplier.use-case'
import { FetchAllSuppliersUseCase } from '@/domain/suppliers/application/use-cases/fetch-all-suppliers.use-case'
import { FindSupplierByIdUseCase } from '@/domain/suppliers/application/use-cases/find-supplier-by-id.use-case'
import { FindSupplierByNameUseCase } from '@/domain/suppliers/application/use-cases/find-supplier-by-name.use-case'
import { UploadAndCreateAttachmentUseCase } from '@/domain/uploads/upload-and-create-attachment.use-case'
import { AuthenticateUserUseCase } from '@/domain/user/application/use-cases/authenticate-user'
import { RegisterUserUseCase } from '@/domain/user/application/use-cases/register-user'
import { DeleteServantController } from '@/infra/http/controllers/servants/delete-servant.controller'
import { EditServantController } from '@/infra/http/controllers/servants/edit-servant.controller'
import { FindServantByIdController } from '@/infra/http/controllers/servants/find-servant-by-id.controller'
import { FindServantByNameController } from '@/infra/http/controllers/servants/find-servant-by-name.controller'
import { FindSupplierByIdController } from '@/infra/http/controllers/suppliers/find-suppliers-by-id.controller'
import { FindSupplierByNameController } from '@/infra/http/controllers/suppliers/find-suppliers-by-name.controller'
import { Module } from '@nestjs/common'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { DatabaseModule } from '../database/database.module'
import { StorageModule } from '../storage/storage.module'
import { CreateProductController } from './controllers/products/create-product.controller'
import { DeleteProductController } from './controllers/products/delete-product.controller'
import { EditProductController } from './controllers/products/edit-product.controller'
import { FetchAllProductsController } from './controllers/products/fetch-all-products.controller'
import { FindProductByIdController } from './controllers/products/find-product-by-id.controller'
import { FindProductsByNameController } from './controllers/products/find-products-by-name.controller'
import { CreateSaleController } from './controllers/sales/create-sale.controller'
import { DeleteSaleController } from './controllers/sales/delete-sale.controller'
import { EditSaleController } from './controllers/sales/edit-sale.controller'
import { FetchAllSalesController } from './controllers/sales/fetch-all-sales.controller'
import { FindSaleByIdController } from './controllers/sales/find-sale-by-id.controller'
import { CreateServantController } from './controllers/servants/create-servant.controller'
import { FetchAllServantsController } from './controllers/servants/fetch-all-servants.controller'
import { CreateSupplierController } from './controllers/suppliers/create-supplier.controller'
import { DeleteSupplierController } from './controllers/suppliers/delete-supplier.controller'
import { EditSupplierController } from './controllers/suppliers/edit-supplier.controller'
import { FetchAllSupplierController } from './controllers/suppliers/fetch-all-suppliers.controller'
import { UploadAttachmentsController } from './controllers/uploads/upload-attachment.controller'
import { AuthenticateController } from './controllers/users/authenticate.controller'
import { CreateAccountController } from './controllers/users/create-account.controller'
import { CreateCustomerController } from './controllers/customers/create-customer.controller'
import { CreateCustomerUseCase } from '@/domain/customers/application/use-cases/create-customer.use-case'
import { FetchCustomersController } from './controllers/customers/fetch-customers.controller'
import { FetchCustomersUseCase } from '@/domain/customers/application/use-cases/fetch-customers.use-case'

@Module({
  imports: [DatabaseModule, CryptographyModule, StorageModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateProductController,
    CreateSupplierController,
    EditSupplierController,
    DeleteSupplierController,
    FetchAllSupplierController,
    FindSupplierByNameController,
    EditProductController,
    DeleteProductController,
    FindProductByIdController,
    FindProductsByNameController,
    FetchAllProductsController,
    CreateServantController,
    EditServantController,
    DeleteServantController,
    FetchAllServantsController,
    FindServantByNameController,
    FindServantByIdController,
    FindSupplierByIdController,
    CreateSaleController,
    DeleteSaleController,
    EditSaleController,
    FetchAllSalesController,
    FindSaleByIdController,
    UploadAttachmentsController,
    CreateCustomerController,
    FetchCustomersController,
  ],
  providers: [
    RegisterUserUseCase,
    AuthenticateUserUseCase,
    CreateProductUseCase,
    CreateSupplierUseCase,
    EditSupplierUseCase,
    DeleteSupplierUseCase,
    FetchAllSuppliersUseCase,
    FindSupplierByNameUseCase,
    FindSupplierByIdUseCase,
    EditProductUseCase,
    DeleteProductUseCase,
    FindProductByIdUseCase,
    FindProductByNameUseCase,
    FetchAllProductsUseCase,
    CreateServantUseCase,
    EditServantUseCase,
    DeleteServantUseCase,
    FetchAllServantsUseCase,
    FindServantByNameUseCase,
    FindServantByIdUseCase,
    CreateSaleUseCase,
    DeleteSaleUseCase,
    EditSaleUseCase,
    FetchAllSalesUseCase,
    FindSaleByIdUseCase,
    UploadAndCreateAttachmentUseCase,
    CreateCustomerUseCase,
    FetchCustomersUseCase,
  ],
})
export class HttpModule {}
