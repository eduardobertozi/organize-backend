import { FindSaleByIdUseCase } from '@/domain/sales/application/use-cases/find-sale-by-id.use-case'
import { BadRequestException, Controller, Get, Param } from '@nestjs/common'
import { SalePresenter } from '../../presenters/http-sale.presenter'
import {
  SaleIdParam,
  SaleIdParamValidationPipe,
} from '../../schemas/sale-id-param.schema'

@Controller()
export class FindSaleByIdController {
  constructor(private readonly findSaleByIdUseCase: FindSaleByIdUseCase) {}

  @Get('sales/:saleId')
  async handle(
    @Param('saleId', SaleIdParamValidationPipe) saleId: SaleIdParam,
  ) {
    const result = await this.findSaleByIdUseCase.execute({
      saleId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    return {
      sale: SalePresenter.toHTTP(result.value.sale),
    }
  }
}
