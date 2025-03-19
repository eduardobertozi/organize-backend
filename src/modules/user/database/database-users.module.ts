import { PrismaService } from '@/infrastructure/database/prisma.service'
import { Module } from '@nestjs/common'
import { UsersRepository } from '../users.repository'
import { PrismaUserService } from './prisma-user.service'

@Module({
  providers: [
    PrismaService,
    {
      provide: UsersRepository,
      useClass: PrismaUserService,
    },
  ],
  exports: [PrismaService, UsersRepository],
})
export class DatabaseUsersModule {}
