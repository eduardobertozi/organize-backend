import { CreateSaleServantUseCase } from '@/domain/sale-servants/application/use-cases/create-sale-servant.use-case'
import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UsePipes,
} from '@nestjs/common'
import {
  CreateSaleServantDTO,
  CreateSaleServantValidationPipe,
} from '../../dto/create-sale-servant.dto'
import { SaleServantsPresenter } from '../../presenters/http-sale-servants.presenter'

@Controller()
export class CreateSaleServantController {
  constructor(
    private readonly createSaleServantUseCase: CreateSaleServantUseCase,
  ) {}

  @Post('sale-servants')
  @UsePipes(CreateSaleServantValidationPipe)
  async handle(@Body() body: CreateSaleServantDTO) {
    const result = await this.createSaleServantUseCase.execute(body)

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    return {
      saleServant: SaleServantsPresenter.toHTTP(result.value.saleServant),
    }
  }
}
