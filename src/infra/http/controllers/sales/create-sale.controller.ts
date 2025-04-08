import { CreateSaleUseCase } from '@/domain/sales/application/use-cases/create-sale.use-case'
import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UsePipes,
} from '@nestjs/common'
import { SalePresenter } from '../../presenters/http-sale.presenter'
import {
  CreateSaleDTO,
  CreateSaleValidationPipe,
} from '../../dto/create-sale.dto'

@Controller()
export class CreateSaleController {
  constructor(private readonly createSaleUseCase: CreateSaleUseCase) {}

  @Post('sales')
  @UsePipes(CreateSaleValidationPipe)
  async handle(@Body() body: CreateSaleDTO) {
    const result = await this.createSaleUseCase.execute({
      ...body,
      servantsIds: body.servants,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    return {
      sale: SalePresenter.toHTTP(result.value.sale),
    }
  }
}
