import { Module } from '@nestjs/common'
import { ServantsModule } from './modules/servants/servants.module'
import { SuppliersModule } from './modules/suppliers/suppliers.module'
import { ProductsModule } from './modules/products/product.module'

@Module({
  imports: [ServantsModule, ProductsModule, SuppliersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
