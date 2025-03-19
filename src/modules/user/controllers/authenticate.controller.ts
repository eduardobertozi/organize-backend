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
import { z } from 'zod'
import { AuthenticateUserUseCase } from '../use-cases/authenticate-user'
import { WrongCredentialsError } from '../use-cases/errors/wrong-credentials-error'

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>

@Controller('/sessions')
@Public()
export class AuthenticateController {
  constructor(private readonly authenticateStudent: AuthenticateUserUseCase) {}

  @Post()
  @UsePipes(new ZodValidationPipe(authenticateBodySchema))
  async handle(@Body() body: AuthenticateBodySchema) {
    const { email, password } = body

    const result = await this.authenticateStudent.execute({
      email,
      password,
    })

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
