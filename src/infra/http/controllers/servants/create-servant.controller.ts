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
import { ServantPresenter } from '../../presenters/http-servants.presenter'

@Controller()
export class CreateServantController {
  constructor(private readonly createServantUseCase: CreateServantUseCase) {}

  @Post('servants')
  @UsePipes(CreateServantValidationPipe)
  async createServant(@Body() servant: CreateServantDTO) {
    const result = await this.createServantUseCase.execute(servant)

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    return {
      servant: ServantPresenter.toHTTP(result.value.servant),
    }
  }
}
