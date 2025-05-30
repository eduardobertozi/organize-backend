import { UniqueEntityID } from '@/core/unique-entity-id'
import { Prisma, User as PrismaUser } from '@prisma/client'
import { User } from '@/domain/user/enterprise/entities/user'

export class PrismaUserMapper {
  static toDomain(raw: PrismaUser): User {
    return User.create(
      {
        name: raw.name,
        username: raw.username,
        password: raw.password,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(user: User): Prisma.UserUncheckedCreateInput {
    return {
      id: user.id.toString(),
      name: user.name,
      username: user.username,
      password: user.password,
    }
  }
}
