import { Public } from '@/infrastructure/auth/public'
import { ZodValidationPipe } from '@/infrastructure/pipes/zod-validation.pipe'
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
  UsePipes,
} from '@nestjs/common'
import {
  CreateAccountDTO,
  CreateAccountSchema,
} from '../dto/create-account.dto'
import { UserAlreadyExistsError } from '../use-cases/errors/user-already-exists-error'
import { RegisterUserUseCase } from '../use-cases/register-user'

@Controller()
@Public()
export class CreateAccountController {
  constructor(private readonly registerUser: RegisterUserUseCase) {}

  @Post('/accounts')
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(CreateAccountSchema))
  async handle(@Body() body: CreateAccountDTO) {
    const result = await this.registerUser.execute(body)

    const error = result.value

    if (result.isLeft()) {
      if (error.constructor === UserAlreadyExistsError) {
        throw new ConflictException(error.message)
      }

      throw new BadRequestException()
    }
  }
}
