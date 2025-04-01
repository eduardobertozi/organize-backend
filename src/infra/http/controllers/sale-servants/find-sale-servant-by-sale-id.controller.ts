import { FindSaleServantBySaleIdUseCase } from '@/domain/sale-servants/application/use-cases/fetch-all-sale-servants-by-sale-id.use-case'
import { BadRequestException, Controller, Get, Param } from '@nestjs/common'
import { SaleServantsPresenter } from '../../presenters/http-sale-servants.presenter'
import {
  SaleIdParam,
  SaleIdParamValidationPipe,
} from '../../schemas/sale-id-param.schema'

@Controller()
export class FindSaleServantBySaleIdController {
  constructor(
    private readonly findSaleServantBySaleIdUseCase: FindSaleServantBySaleIdUseCase,
  ) {}

  @Get('sale-servants/:saleId/sale')
  async handle(
    @Param('saleId', SaleIdParamValidationPipe) saleId: SaleIdParam,
  ) {
    const result = await this.findSaleServantBySaleIdUseCase.execute({
      saleId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    return {
      saleServants: result.value.saleServants.map((saleServant) =>
        SaleServantsPresenter.toHTTP(saleServant),
      ),
    }
  }
}
