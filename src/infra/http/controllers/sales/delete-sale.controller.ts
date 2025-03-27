import { DeleteSaleUseCase } from '@/domain/sales/application/use-cases/delete-sale.use-case'
import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from '@nestjs/common'
import {
  SaleIdParam,
  SaleIdParamValidationPipe,
} from '../../schemas/sale-id-param.schema'

@Controller()
export class DeleteSaleController {
  constructor(private readonly deleteSaleUseCase: DeleteSaleUseCase) {}

  @Delete('sales/:saleId')
  @HttpCode(204)
  async handle(
    @Param('saleId', SaleIdParamValidationPipe) saleId: SaleIdParam,
  ) {
    const result = await this.deleteSaleUseCase.execute({ saleId })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
