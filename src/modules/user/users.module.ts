import { Module } from '@nestjs/common'
import { AuthenticateUserUseCase } from './use-cases/authenticate-user'
import { RegisterUserUseCase } from './use-cases/register-user'
import { AuthenticateController } from './controllers/authenticate.controller'
import { CreateAccountController } from './controllers/create-account.controller'
import { DatabaseUsersModule } from './database/database-users.module'
import { CryptographyModule } from '@/infrastructure/cryptography/cryptography.module'

@Module({
  imports: [DatabaseUsersModule, CryptographyModule],
  controllers: [AuthenticateController, CreateAccountController],
  providers: [AuthenticateUserUseCase, RegisterUserUseCase],
})
export class UsersModule {}
