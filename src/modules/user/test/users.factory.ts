import { faker } from '@faker-js/faker'
import { User, UserProps } from '../user.entity'
import { UniqueEntityID } from '@/core/unique-entity-id'

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

// @Injectable()
// export class UserFactory {
//   constructor(private readonly prismaService: PrismaService) {}

//   async makePrismaUser(data: Partial<UserProps> = {}): Promise<User> {
//     const user = makeUser(data)

//     await this.prismaService.user.create({
//       data: PrismaUserMapper.toPrisma(user),
//     })

//     return user
//   }
// }
