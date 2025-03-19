import { Public } from '@/infrastructure/auth/public'
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
  UsePipes,
} from '@nestjs/common'
import { z } from 'zod'
import { RegisterUserUseCase } from '../use-cases/register-user'
import { ZodValidationPipe } from '@/infrastructure/pipes/zod-validation.pipe'
import { UserAlreadyExistsError } from '../use-cases/errors/user-already-exists-error'

const createAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
})

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>

@Controller('/accounts')
@Public()
export class CreateAccountController {
  constructor(private readonly registerUser: RegisterUserUseCase) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  async handle(@Body() body: CreateAccountBodySchema) {
    const { name, email, password } = body

    const result = await this.registerUser.execute({
      name,
      email,
      password,
    })

    const error = result.value

    if (result.isLeft()) {
      if (error.constructor === UserAlreadyExistsError) {
        throw new ConflictException(error.message)
      }

      throw new BadRequestException()
    }
  }
}
