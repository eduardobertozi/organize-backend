import { DeleteSaleServantUseCase } from '@/domain/sale-servants/application/use-cases/delete-sale-servant.use-case'
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
import {
  ServantIdParam,
  ServantIdParamValidationPipe,
} from '../../schemas/servant-id-param.schema'

@Controller()
export class DeleteSaleServantController {
  constructor(
    private readonly deleteSaleServantUseCase: DeleteSaleServantUseCase,
  ) {}

  @Delete('sale-servants/:saleId/sale/:servantId/servant')
  @HttpCode(204)
  async handle(
    @Param('saleId', SaleIdParamValidationPipe) saleId: SaleIdParam,
    @Param('servantId', ServantIdParamValidationPipe) servantId: ServantIdParam,
  ) {
    const result = await this.deleteSaleServantUseCase.execute({
      saleId,
      servantId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
