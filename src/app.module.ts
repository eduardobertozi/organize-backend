import { Module } from '@nestjs/common'
import { ServantsModule } from './modules/servants/servants.module'
import { SuppliersModule } from './modules/suppliers/suppliers.module'
import { ProductsModule } from './modules/products/product.module'
import { UsersModule } from './modules/user/users.module'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from './infrastructure/env/env'
import { EnvModule } from './infrastructure/env/env.module'
import { AuthModule } from './infrastructure/auth/auth.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
    EnvModule,
    ServantsModule,
    ProductsModule,
    SuppliersModule,
    UsersModule,
  ],
})
export class AppModule {}
