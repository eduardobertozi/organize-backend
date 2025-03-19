import { faker } from '@faker-js/faker'
import { User, UserProps } from '../user.entity'
import { UniqueEntityID } from '@/core/unique-entity-id'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/infrastructure/database/prisma.service'
import { PrismaUserMapper } from '../database/users.mapper'

export function makeUser(
  override: Partial<UserProps> = {},
  id?: UniqueEntityID,
) {
  return User.create(
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      ...override,
    },
    id,
  )
}

@Injectable()
export class UsersFactory {
  constructor(private readonly prismaService: PrismaService) {}

  async makePrismaUser(data: Partial<UserProps> = {}): Promise<User> {
    const user = makeUser(data)

    await this.prismaService.user.create({
      data: PrismaUserMapper.toPrisma(user),
    })

    return user
  }
}
