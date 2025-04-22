import { Either, left, right } from '@/core/either'
import { HashGeneratorGateway } from '@/infra/gateways/cryptography/hasher'
import { Injectable } from '@nestjs/common'
import { User } from '../../enterprise/entities/user'
import { UsersRepository } from '../repositories/users.repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

interface RegisterUserRequest {
  name: string
  username: string
  password: string
}

type RegisterUserResponse = Either<
  UserAlreadyExistsError,
  {
    user: User
  }
>

@Injectable()
export class RegisterUserUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly hashGenerator: HashGeneratorGateway,
  ) {}

  async execute({
    name,
    username,
    password,
  }: RegisterUserRequest): Promise<RegisterUserResponse> {
    const userWithSameEmail =
      await this.usersRepository.findByUsername(username)

    if (userWithSameEmail) {
      return left(new UserAlreadyExistsError(username))
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    const user = User.create({
      name,
      username,
      password: hashedPassword,
    })

    await this.usersRepository.create(user)

    return right({
      user,
    })
  }
}
