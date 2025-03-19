import { Public } from '@/infrastructure/auth/public'
import { ZodValidationPipe } from '@/infrastructure/pipes/zod-validation.pipe'
import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common'
import { AuthenticateUserUseCase } from '../use-cases/authenticate-user'
import { WrongCredentialsError } from '../use-cases/errors/wrong-credentials-error'
import {
  AuthenticateUserDTO,
  AuthenticateUserSchema,
} from '../dto/autenticate-user.dto'

@Controller('/sessions')
@Public()
export class AuthenticateController {
  constructor(private readonly authenticateStudent: AuthenticateUserUseCase) {}

  @Post()
  @UsePipes(new ZodValidationPipe(AuthenticateUserSchema))
  async handle(@Body() body: AuthenticateUserDTO) {
    const result = await this.authenticateStudent.execute(body)

    const error = result.value

    if (result.isLeft()) {
      if (error.constructor === WrongCredentialsError) {
        throw new UnauthorizedException(error.message)
      }

      throw new BadRequestException()
    }

    const { accessToken } = result.value

    return {
      access_token: accessToken,
    }
  }
}
