import { PrismaService } from '@/infrastructure/database/prisma.service'
import { Injectable } from '@nestjs/common'
import { User } from '../user.entity'
import { UsersRepository } from '../users.repository'
import { PrismaUserMapper } from './users.mapper'

@Injectable()
export class PrismaUserService implements UsersRepository {
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
