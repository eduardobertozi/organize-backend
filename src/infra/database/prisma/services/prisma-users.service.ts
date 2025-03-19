import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { User } from '@/domain/user/enterprise/entities/user'
import { UsersRepository } from '@/domain/user/application/repositories/users.repository'
import { PrismaUserMapper } from '../mappers/prisma-users.mapper'

@Injectable()
export class PrismaUsersService implements UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return null
    }

    return PrismaUserMapper.toDomain(user)
  }

  async create(user: User): Promise<void> {
    const data = PrismaUserMapper.toPrisma(user)
    await this.prisma.user.create({ data })
  }
}
