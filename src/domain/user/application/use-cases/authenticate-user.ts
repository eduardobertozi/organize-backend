import { Either, left, right } from '@/core/either'
import { EncrypterGateway } from '@/infra/gateways/cryptography/encrypter'
import { HashComparerGateway } from '@/infra/gateways/cryptography/hasher'
import { Injectable } from '@nestjs/common'
import { UsersRepository } from '../repositories/users.repository'
import { WrongCredentialsError } from './errors/wrong-credentials-error'

interface AuthenticateUserRequest {
  email: string
  password: string
}

type AuthenticateUserResponse = Either<
  WrongCredentialsError,
  {
    accessToken: string
  }
>

@Injectable()
export class AuthenticateUserUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly hashCompare: HashComparerGateway,
    private readonly encrypter: EncrypterGateway,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateUserRequest): Promise<AuthenticateUserResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      return left(new WrongCredentialsError())
    }

    const isPasswordValid = await this.hashCompare.compare(
      password,
      user.password,
    )

    if (!isPasswordValid) {
      return left(new WrongCredentialsError())
    }

    const accessToken = await this.encrypter.encrypt({
      sub: user.id.toString(),
    })

    return right({
      accessToken,
    })
  }
}
