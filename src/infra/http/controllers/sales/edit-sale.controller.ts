import { EditSaleUseCase } from '@/domain/sales/application/use-cases/edit-sale.use-case'
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Param,
  Put,
  UsePipes,
} from '@nestjs/common'
import {
  SaleIdParam,
  SaleIdParamValidationPipe,
} from '../../schemas/sale-id-param.schema'
import {
  CreateSaleDTO,
  CreateSaleValidationPipe,
} from '../../dto/create-sale.dto'

@Controller()
export class EditSaleController {
  constructor(private readonly editSaleUseCase: EditSaleUseCase) {}

  @Put('sales/:saleId')
  @UsePipes()
  @HttpCode(204)
  async handle(
    @Param('saleId', SaleIdParamValidationPipe) saleId: SaleIdParam,
    @Body(CreateSaleValidationPipe) body: CreateSaleDTO,
  ) {
    const result = await this.editSaleUseCase.execute({
      saleId,
      ...body,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
