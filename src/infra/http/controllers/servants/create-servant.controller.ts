import { CreateServantUseCase } from '@/domain/servants/application/use-cases/create-servant.use-case'
import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UsePipes,
} from '@nestjs/common'
import {
  CreateServantDTO,
  CreateServantValidationPipe,
} from '../../dto/create-servant.dto'

@Controller()
export class CreateServantController {
  constructor(private readonly createServantUseCase: CreateServantUseCase) {}

  @Post('servants')
  @UsePipes(CreateServantValidationPipe)
  async createServant(@Body() servant: CreateServantDTO): Promise<void> {
    const result = await this.createServantUseCase.execute(servant)

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
