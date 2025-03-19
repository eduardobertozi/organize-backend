import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { User } from '../user.entity'
import { UsersRepository } from '../users.repository'
import { HashGeneratorGateway } from '@/infrastructure/cryptography/hasher'

interface RegisterUserRequest {
  name: string
  email: string
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
    email,
    password,
  }: RegisterUserRequest): Promise<RegisterUserResponse> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      return left(new UserAlreadyExistsError(email))
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    const user = User.create({
      name,
      email,
      password: hashedPassword,
    })

    await this.usersRepository.create(user)

    return right({
      user,
    })
  }
}
