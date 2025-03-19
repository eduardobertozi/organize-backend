import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { StorageModule } from '../storage/storage.module'
import { CreateAccountController } from './controllers/users/create-account.controller'
import { RegisterUserUseCase } from '@/domain/user/application/use-cases/register-user'
import { AuthenticateController } from './controllers/users/authenticate.controller'
import { AuthenticateUserUseCase } from '@/domain/user/application/use-cases/authenticate-user'

@Module({
  imports: [DatabaseModule, CryptographyModule, StorageModule],
  controllers: [CreateAccountController, AuthenticateController],
  providers: [RegisterUserUseCase, AuthenticateUserUseCase],
})
export class HttpModule {}
