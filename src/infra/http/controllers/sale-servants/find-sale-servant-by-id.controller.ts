import { FindSaleServantByIdUseCase } from '@/domain/sale-servants/application/use-cases/find-sale-servant-by-servant-id.use-case'
import { BadRequestException, Controller, Get, Param } from '@nestjs/common'
import { SaleServantsPresenter } from '../../presenters/http-sale-servants.presenter'
import {
  SaleServantIdParam,
  SaleServantIdParamValidationPipe,
} from '../../schemas/sale-servant-id-param.schema'

@Controller()
export class FindSaleServantByIdController {
  constructor(
    private readonly findSaleServantByIdUseCase: FindSaleServantByIdUseCase,
  ) {}

  @Get('sale-servants/:saleServantId')
  async handle(
    @Param('saleServantId', SaleServantIdParamValidationPipe)
    saleServantId: SaleServantIdParam,
  ) {
    const result = await this.findSaleServantByIdUseCase.execute({
      saleServantId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    return {
      saleServant: SaleServantsPresenter.toHTTP(result.value.saleServant),
    }
  }
}
