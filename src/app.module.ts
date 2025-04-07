import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from './infra/env/env'
import { AuthModule } from './infra/auth/auth.module'
import { EnvModule } from './infra/env/env.module'
import { HttpModule } from './infra/http/http.module'
import { MulterModule } from '@nestjs/platform-express'
import * as multer from 'multer'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    MulterModule.register({
      storage: multer.memoryStorage(),
    }),
    AuthModule,
    EnvModule,
    HttpModule,
  ],
})
export class AppModule {}
